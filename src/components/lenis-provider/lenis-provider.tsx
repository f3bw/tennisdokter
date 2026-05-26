'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

// Module-level singleton
let lenisInstance: Lenis | null = null

export const getLenis = (): Lenis | null => lenisInstance

interface LenisProviderProps {
    children: ReactNode
}

export const LenisProvider = ({ children }: LenisProviderProps) => {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches

        if (prefersReducedMotion) return

        gsap.registerPlugin(ScrollTrigger)

        const lenis = new Lenis({
            lerp: 0.1,
            smoothWheel: true,
        })

        lenisInstance = lenis
        lenisRef.current = lenis

        const onRaf = (time: number) => {
            lenis.raf(time * 1000)
        }

        gsap.ticker.add(onRaf)
        lenis.on('scroll', ScrollTrigger.update)
        gsap.ticker.lagSmoothing(0)

        return () => {
            gsap.ticker.remove(onRaf)
            lenis.destroy()
            lenisInstance = null
            lenisRef.current = null
        }
    }, [])

    return <>{children}</>
}
