'use client'

import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { useEffect, useRef } from 'react'

import styles from './magnetic-cursor.module.css'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(Flip)
}

export const MagneticCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null)
    const cursorBgRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const cursor = cursorRef.current
        const cursorBg = cursorBgRef.current
        if (!cursor || !cursorBg) return

        // Check for touch device or reduced motion
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches

        if (isTouchDevice || prefersReducedMotion) {
            cursor.style.display = 'none'
            return
        }

        // Make cursor follow mouse
        gsap.set(cursor, { xPercent: -50, yPercent: -50 })

        const xTo = gsap.quickTo(cursor, 'x', { duration: 0.6, ease: 'power3' })
        const yTo = gsap.quickTo(cursor, 'y', { duration: 0.6, ease: 'power3' })

        const handleMouseMove = (e: MouseEvent) => {
            xTo(e.clientX)
            yTo(e.clientY)
        }

        window.addEventListener('mousemove', handleMouseMove)

        // Setup magnetic targets
        const hoverTargets = document.querySelectorAll(
            '[data-magnetic-cursor-target]'
        )

        const enterHandlers: Map<Element, () => void> = new Map()
        const leaveHandlers: Map<Element, () => void> = new Map()

        hoverTargets.forEach((target) => {
            const bgHolder = target.querySelector('[data-magnetic-cursor-bg]')
            if (!bgHolder) return

            const enterHandler = () => {
                const state = Flip.getState(cursorBg)
                bgHolder.appendChild(cursorBg)
                Flip.from(state, {
                    ease: 'back.out(1)',
                    duration: 0.3,
                })
            }

            const leaveHandler = () => {
                const state = Flip.getState(cursorBg, { props: 'opacity' })
                cursor.appendChild(cursorBg)
                Flip.from(state, {
                    ease: 'power4.out',
                    duration: 0.5,
                })
            }

            enterHandlers.set(target, enterHandler)
            leaveHandlers.set(target, leaveHandler)

            target.addEventListener('mouseenter', enterHandler)
            target.addEventListener('mouseleave', leaveHandler)
        })

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            hoverTargets.forEach((target) => {
                const enterHandler = enterHandlers.get(target)
                const leaveHandler = leaveHandlers.get(target)
                if (enterHandler)
                    target.removeEventListener('mouseenter', enterHandler)
                if (leaveHandler)
                    target.removeEventListener('mouseleave', leaveHandler)
            })
        }
    }, [])

    return (
        <div ref={cursorRef} className={styles.cursor}>
            <div ref={cursorBgRef} className="cursor-bg" />
        </div>
    )
}
