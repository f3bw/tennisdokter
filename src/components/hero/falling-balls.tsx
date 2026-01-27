'use client'

import { useEffect, useRef } from 'react'

import styles from './hero.module.css'

const BALL_TEXTURES = [
    '/logos/logo-ball-blue-plain.svg',
    '/logos/logo-ball-green-plain.svg',
    '/logos/logo-ball-orange-plain.svg',
    '/logos/logo-ball-red-plain.svg',
    '/logos/logo-ball-yellow-plain.svg',
]

export const FallingBalls = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const engineRef = useRef<Matter.Engine | null>(null)
    const renderRef = useRef<Matter.Render | null>(null)
    const runnerRef = useRef<Matter.Runner | null>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        let Matter: typeof import('matter-js')

        const initMatter = async () => {
            Matter = await import('matter-js')

            const {
                Engine,
                Render,
                Runner,
                Bodies,
                Composite,
                Mouse,
                MouseConstraint,
            } = Matter

            const canvasWidth = container.clientWidth + 2
            const canvasHeight = container.clientHeight + 2
            const canvasWallDepth = canvasWidth / 4
            const ballAmount = 12
            const ballSize = Math.min(canvasWidth, canvasHeight) / 6
            const ballRestitution = 0.75
            const worldGravity = 1.5

            // Create engine
            const engine = Engine.create()
            engine.world.gravity.y = worldGravity
            engineRef.current = engine

            // Create renderer
            const render = Render.create({
                element: container,
                engine: engine,
                options: {
                    background: 'transparent',
                    wireframes: false,
                    width: canvasWidth,
                    height: canvasHeight,
                    pixelRatio: window.devicePixelRatio || 2,
                },
            })
            renderRef.current = render

            // Helper to get random position
            const getRandomNumber = (min: number, max: number) => {
                return Math.random() * (max - min) + min
            }

            const min = ballSize / 2
            const max = canvasWidth - ballSize / 2

            // Texture index for cycling through colors
            let textureIndex = 0
            const getNextTexture = () => {
                const texture = BALL_TEXTURES[textureIndex]
                textureIndex = (textureIndex + 1) % BALL_TEXTURES.length
                return texture
            }

            // Calculate sprite scale (texture is 420px, scale to ball size)
            const spriteScale = ballSize / 420

            // Create tennis ball
            const createBall = () => {
                const ball = Bodies.circle(
                    getRandomNumber(min, max),
                    -ballSize,
                    ballSize / 2,
                    {
                        restitution: ballRestitution,
                        friction: 0.1,
                        render: {
                            sprite: {
                                texture: getNextTexture(),
                                xScale: spriteScale,
                                yScale: spriteScale,
                            },
                        },
                    }
                )
                Composite.add(engine.world, ball)
            }

            // Create walls
            const walls = [
                // Bottom
                Bodies.rectangle(
                    canvasWidth / 2,
                    canvasHeight + canvasWallDepth,
                    canvasWidth + canvasWallDepth * 4,
                    canvasWallDepth * 2,
                    { isStatic: true, render: { visible: false } }
                ),
                // Left
                Bodies.rectangle(
                    -canvasWallDepth,
                    canvasHeight / 2,
                    canvasWallDepth * 2,
                    canvasHeight,
                    { isStatic: true, render: { visible: false } }
                ),
                // Right
                Bodies.rectangle(
                    canvasWidth + canvasWallDepth,
                    canvasHeight / 2,
                    canvasWallDepth * 2,
                    canvasHeight,
                    { isStatic: true, render: { visible: false } }
                ),
            ]

            Composite.add(engine.world, walls)

            // Run renderer
            Render.run(render)

            // Create and run runner
            const runner = Runner.create()
            runnerRef.current = runner
            Runner.run(runner, engine)

            // Add balls with delay
            let count = 0
            const addBalls = () => {
                if (count < ballAmount) {
                    createBall()
                    count++
                    setTimeout(addBalls, 150)
                }
            }
            addBalls()

            // Mouse interaction
            const mouse = Mouse.create(render.canvas)
            const mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: { visible: false },
                },
            })

            Composite.add(engine.world, mouseConstraint)

            // Keep mouse in sync with rendering
            render.mouse = mouse

            // Allow native page scroll by removing Matter.js wheel listeners
            const canvas = render.canvas
            const mouseEvents = mouse as unknown as {
                mousewheel: EventListener
            }
            if (mouseEvents.mousewheel) {
                canvas.removeEventListener('mousewheel', mouseEvents.mousewheel)
                canvas.removeEventListener(
                    'DOMMouseScroll',
                    mouseEvents.mousewheel
                )
                canvas.removeEventListener('wheel', mouseEvents.mousewheel)
            }
        }

        initMatter()

        return () => {
            if (renderRef.current) {
                Matter?.Render.stop(renderRef.current)
                renderRef.current.canvas.remove()
            }
            if (runnerRef.current) {
                Matter?.Runner.stop(runnerRef.current)
            }
            if (engineRef.current) {
                Matter?.Engine.clear(engineRef.current)
            }
        }
    }, [])

    return (
        <div className={styles['canvas-matter']}>
            <div className={styles['canvas-matter-before']} />
            <div
                ref={containerRef}
                id="canvas-target"
                className={styles['canvas-matter-target']}
            />
        </div>
    )
}
