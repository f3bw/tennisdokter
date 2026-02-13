'use client'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

interface UseMagneticButtonOptions {
    strength?: number
    innerStrength?: number
}

export const useMagneticButton = <T extends HTMLElement>(
    options: UseMagneticButtonOptions = {}
) => {
    const { strength = 50, innerStrength = 25 } = options
    const buttonRef = useRef<T>(null)

    useEffect(() => {
        const button = buttonRef.current
        if (!button) return

        // Check for touch device or small screen
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
        const isSmallScreen = window.innerWidth <= 991
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches

        if (isTouchDevice || isSmallScreen || prefersReducedMotion) {
            return
        }

        const inner = button.querySelector(
            '[data-magnetic-inner]'
        ) as HTMLElement | null

        const resetEl = (el: HTMLElement | null, immediate: boolean) => {
            if (!el) return
            gsap.killTweensOf(el)
            if (immediate) {
                gsap.set(el, {
                    x: '0em',
                    y: '0em',
                    rotate: '0.001deg',
                    clearProps: 'all',
                })
            } else {
                gsap.to(el, {
                    x: '0em',
                    y: '0em',
                    rotate: '0.001deg',
                    ease: 'elastic.out(1, 0.3)',
                    duration: 1.6,
                    clearProps: 'all',
                })
            }
        }

        const handleMouseEnter = () => {
            resetEl(button, true)
            resetEl(inner, true)
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect()
            const offsetX =
                ((e.clientX - rect.left) / button.offsetWidth - 0.5) *
                (strength / 16)
            const offsetY =
                ((e.clientY - rect.top) / button.offsetHeight - 0.5) *
                (strength / 16)

            gsap.to(button, {
                x: `${offsetX}em`,
                y: `${offsetY}em`,
                rotate: '0.001deg',
                ease: 'power4.out',
                duration: 1.6,
            })

            if (inner) {
                const innerOffsetX =
                    ((e.clientX - rect.left) / button.offsetWidth - 0.5) *
                    (innerStrength / 16)
                const innerOffsetY =
                    ((e.clientY - rect.top) / button.offsetHeight - 0.5) *
                    (innerStrength / 16)

                gsap.to(inner, {
                    x: `${innerOffsetX}em`,
                    y: `${innerOffsetY}em`,
                    rotate: '0.001deg',
                    ease: 'power4.out',
                    duration: 2,
                })
            }
        }

        const handleMouseLeave = () => {
            resetEl(button, false)
            resetEl(inner, false)
        }

        button.addEventListener('mouseenter', handleMouseEnter)
        button.addEventListener('mousemove', handleMouseMove)
        button.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            button.removeEventListener('mouseenter', handleMouseEnter)
            button.removeEventListener('mousemove', handleMouseMove)
            button.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [strength, innerStrength])

    return buttonRef
}
