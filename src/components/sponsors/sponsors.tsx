'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

import styles from './sponsors.module.css'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const logos = [
    {
        src: '/brands/RacketTuning.svg',
        alt: 'RacketTuning',
        href: 'https://rackettuning.nl/',
    },
    {
        src: '/brands/TVR Logo.svg',
        alt: 'TPR',
        href: 'https://tproosendaal.nl/',
    },
    {
        src: '/brands/logo.svg',
        alt: 'Rabrice werger',
        href: 'https://www.fabricewerger.nl/',
    },
    {
        src: '/brands/TennisschoolFerdinandWerger.svg',
        alt: 'Tennisschool Ferdinand Werger',
        href: '',
    },
    {
        src: '/brands/waterman.png',
        alt: 'Waterman legal consultancy',
        href: 'https://www.watermanlegal.nl/',
    },
]

const LOOP_DELAY = 1.5
const DURATION = 0.9

const shuffleArray = <T,>(arr: T[]): T[] => {
    const a = arr.slice()
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

export const Sponsors = () => {
    const rootRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)
    const poolRef = useRef<HTMLDivElement[]>([])
    const patternRef = useRef<number[]>([])
    const patternIndexRef = useRef(0)
    const visibleItemsRef = useRef<HTMLDivElement[]>([])
    const visibleCountRef = useRef(0)

    useEffect(() => {
        if (!rootRef.current || !listRef.current) return

        const list = listRef.current
        const items = Array.from(
            list.querySelectorAll<HTMLDivElement>('[data-logo-wall-item]')
        )
        const originalTargets = items
            .map((item) =>
                item.querySelector<HTMLDivElement>('[data-logo-wall-target]')
            )
            .filter(Boolean) as HTMLDivElement[]

        const isVisible = (el: HTMLElement) =>
            window.getComputedStyle(el).display !== 'none'

        const setup = () => {
            if (timelineRef.current) {
                timelineRef.current.kill()
            }

            visibleItemsRef.current = items.filter(isVisible)
            visibleCountRef.current = visibleItemsRef.current.length

            patternRef.current = shuffleArray(
                Array.from({ length: visibleCountRef.current }, (_, i) => i)
            )
            patternIndexRef.current = 0

            // Remove all injected targets
            items.forEach((item) => {
                item.querySelectorAll('[data-logo-wall-target]').forEach(
                    (old) => old.remove()
                )
            })

            poolRef.current = originalTargets.map(
                (n) => n.cloneNode(true) as HTMLDivElement
            )

            // Shuffle the pool but keep first visible logos in order
            const front = poolRef.current.slice(0, visibleCountRef.current)
            const rest = shuffleArray(
                poolRef.current.slice(visibleCountRef.current)
            )
            poolRef.current = front.concat(rest)

            // Place initial logos
            for (let i = 0; i < visibleCountRef.current; i++) {
                const parent =
                    visibleItemsRef.current[i].querySelector<HTMLDivElement>(
                        '[data-logo-wall-target-parent]'
                    ) || visibleItemsRef.current[i]
                const logo = poolRef.current.shift()
                if (logo) {
                    parent.appendChild(logo)
                }
            }

            timelineRef.current = gsap.timeline({
                repeat: -1,
                repeatDelay: LOOP_DELAY,
            })
            timelineRef.current.call(swapNext)
            timelineRef.current.play()
        }

        const swapNext = () => {
            const nowCount = items.filter(isVisible).length
            if (nowCount !== visibleCountRef.current) {
                setup()
                return
            }
            if (!poolRef.current.length) return

            const idx =
                patternRef.current[
                    patternIndexRef.current % visibleCountRef.current
                ]
            patternIndexRef.current++

            const container = visibleItemsRef.current[idx]
            const parent =
                container.querySelector<HTMLDivElement>(
                    '[data-logo-wall-target-parent]'
                ) || container
            const existing = parent.querySelectorAll('[data-logo-wall-target]')
            if (existing.length > 1) return

            const current = parent.querySelector<HTMLDivElement>(
                '[data-logo-wall-target]'
            )
            const incoming = poolRef.current.shift()

            if (!incoming) return

            // Set initial state before adding to DOM to prevent flash
            gsap.set(incoming, {
                yPercent: 50,
                autoAlpha: 0,
                visibility: 'hidden',
            })
            parent.appendChild(incoming)
            // Force reflow then make visible for animation
            gsap.set(incoming, { visibility: 'visible' })

            if (current) {
                gsap.to(current, {
                    yPercent: -50,
                    autoAlpha: 0,
                    duration: DURATION,
                    ease: 'expo.inOut',
                    onComplete: () => {
                        // Reset transform before returning to pool
                        gsap.set(current, { clearProps: 'all' })
                        current.remove()
                        poolRef.current.push(current)
                    },
                })
            }

            gsap.to(incoming, {
                yPercent: 0,
                autoAlpha: 1,
                duration: DURATION,
                delay: 0.1,
                ease: 'expo.inOut',
            })
        }

        setup()

        const scrollTrigger = ScrollTrigger.create({
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            onEnter: () => timelineRef.current?.play(),
            onLeave: () => timelineRef.current?.pause(),
            onEnterBack: () => timelineRef.current?.play(),
            onLeaveBack: () => timelineRef.current?.pause(),
        })

        const handleVisibilityChange = () => {
            if (document.hidden) {
                timelineRef.current?.pause()
            } else {
                timelineRef.current?.play()
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            timelineRef.current?.kill()
            scrollTrigger.kill()
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            )
        }
    }, [])

    return (
        <section id="partners" className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>Partners</h2>

                <div
                    ref={rootRef}
                    data-logo-wall-cycle-init=""
                    className={styles['logo-wall']}
                >
                    <div className={styles['logo-wall-collection']}>
                        <div
                            ref={listRef}
                            data-logo-wall-list=""
                            className={styles['logo-wall-list']}
                        >
                            {logos.map((logo, index) => (
                                <div
                                    key={index}
                                    data-logo-wall-item=""
                                    className={styles['logo-wall-item']}
                                >
                                    <div
                                        data-logo-wall-target-parent=""
                                        className={styles['logo-wall-logo']}
                                    >
                                        <div
                                            className={
                                                styles['logo-wall-logo-before']
                                            }
                                        />
                                        <div
                                            data-logo-wall-target=""
                                            className={
                                                styles['logo-wall-logo-target']
                                            }
                                        >
                                            {logo.href ? (
                                                <a
                                                    href={logo.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={logo.alt}
                                                >
                                                    <Image
                                                        src={logo.src}
                                                        alt={logo.alt}
                                                        width={100}
                                                        height={40}
                                                        className={
                                                            styles[
                                                                'logo-wall-logo-img'
                                                            ]
                                                        }
                                                    />
                                                </a>
                                            ) : (
                                                <Image
                                                    src={logo.src}
                                                    alt={logo.alt}
                                                    width={100}
                                                    height={40}
                                                    className={
                                                        styles[
                                                            'logo-wall-logo-img'
                                                        ]
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <p className={styles.cta}>
                    Interesse in een partnerschap?{' '}
                    <a
                        href="https://wa.me/31629466919?text=Hoi,%20ik%20ben%20geïnteresseerd%20in%20een%20partnerschap."
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Neem contact op
                    </a>
                </p>
            </div>
        </section>
    )
}
