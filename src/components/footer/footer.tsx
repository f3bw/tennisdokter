'use client'

import Image from 'next/image'
import { useCallback } from 'react'

import { getLenis } from '@/components/lenis-provider'

import styles from './footer.module.css'

const FOOTER_LINKS = [
    { id: 'over-mij', label: 'Over Mij' },
    { id: 'hoe-werkt-het', label: 'Hoe Werkt Het' },
    { id: 'tarieven', label: 'Tarieven' },
    { id: 'voor-trainers', label: 'Voor Trainers' },
]

export const Footer = () => {
    const currentYear = new Date().getFullYear()

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

    const handleLinkClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        id: string
    ) => {
        e.preventDefault()
        scrollToSection(id)
    }

    return (
        <footer id="contact" className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <Image
                        src="/logos/logo-letterbox-light.svg"
                        alt="De Tennisdokter"
                        width={180}
                        height={34}
                        className={styles.logo}
                    />
                </div>

                <nav className={styles.nav} aria-label="Footer navigatie">
                    {FOOTER_LINKS.map(({ id, label }) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            className={styles.link}
                            data-magnetic-cursor-target
                            onClick={(e) => handleLinkClick(e, id)}
                        >
                            <span className={styles['link-text']}>{label}</span>
                            <span
                                className={styles['link-bg']}
                                data-magnetic-cursor-bg
                            />
                        </a>
                    ))}
                </nav>

                <p className={styles.copyright}>
                    &copy; {currentYear} De Tennisdokter. Alle rechten
                    voorbehouden.
                </p>
            </div>
        </footer>
    )
}
