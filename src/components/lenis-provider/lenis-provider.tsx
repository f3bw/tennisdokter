'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useEffect, useLayoutEffect, useRef } from 'react'
import type { ReactNode } from 'react'

// Module-level singleton
let lenisInstance: Lenis | null = null

export const getLenis = (): Lenis | null => lenisInstance

interface LenisProviderProps {
    children: ReactNode
}

export const LenisProvider = ({ children }: LenisProviderProps) => {
    const lenisRef = useRef<Lenis | null>(null)

    // Use useLayoutEffect for synchronous setup before paint
    const useIsomorphicLayoutEffect =
        typeof window !== 'undefined' ? useLayoutEffect : useEffect

    useIsomorphicLayoutEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches

        if (prefersReducedMotion) {
            // Don't initialize Lenis if user prefers reduced motion
            return
        }

        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger)

        // Create Lenis instance
        const lenis = new Lenis({
            lerp: 0.1,
            smoothWheel: true,
        })

        lenisInstance = lenis
        lenisRef.current = lenis

        // Integrate with GSAP ticker for ScrollTrigger sync
        const onRaf = (time: number) => {
            lenis.raf(time * 1000)
        }

        gsap.ticker.add(onRaf)

        // Update ScrollTrigger on Lenis scroll
        lenis.on('scroll', ScrollTrigger.update)

        // Tell GSAP to use Lenis scroll
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
