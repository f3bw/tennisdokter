'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useState, useCallback } from 'react'

import { getLenis } from '@/components/lenis-provider'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

export interface NavSection {
    id: string
    label: string
}

export const useScrollSpy = (sections: NavSection[]) => {
    const [activeSection, setActiveSection] = useState<string>(
        sections[0]?.id || ''
    )

    useEffect(() => {
        if (typeof window === 'undefined') return

        const triggers: ScrollTrigger[] = []

        sections.forEach(({ id }) => {
            const element = document.getElementById(id)
            if (!element) return

            const trigger = ScrollTrigger.create({
                trigger: element,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => setActiveSection(id),
                onEnterBack: () => setActiveSection(id),
            })

            triggers.push(trigger)
        })

        return () => {
            triggers.forEach((trigger) => trigger.kill())
        }
    }, [sections])

    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id)
        if (!element) return

        const lenis = getLenis()
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches

        if (lenis && !prefersReducedMotion) {
            lenis.scrollTo(element, { offset: -80 })
        } else {
            element.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
            })
        }
    }, [])

    return { activeSection, scrollToSection }
}
