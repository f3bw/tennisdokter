'use client'

import Image from 'next/image'
import { useCallback } from 'react'

import { getLenis } from '@/components/lenis-provider'

import styles from './footer.module.css'

const FOOTER_LINKS = [
    { id: 'home', label: 'Home' },
    { id: 'over-mij', label: 'Over Mij' },
    { id: 'hoe-werkt-het', label: 'Hoe Werkt Het' },
    { id: 'ervaringen', label: 'Ervaringen' },
    { id: 'tarieven', label: 'Tarieven' },
    { id: 'partners', label: 'Partners' },
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
                <div className={styles.grid}>
                    {/* Brand column */}
                    <div className={styles.brand}>
                        <Image
                            src="/logos/logo-letterbox-light.svg"
                            alt="De Tennisdokter"
                            width={180}
                            height={34}
                            className={styles.logo}
                        />
                        <p className={styles.tagline}>
                            Verbeter je tennis met een persoonlijk videoadvies
                            van een ervaren trainer.
                        </p>
                        <p className={styles.price}>
                            <span className={styles['price-amount']}>€10</span>
                            <span className={styles['price-label']}>
                                {' '}
                                per video-analyse
                            </span>
                        </p>
                    </div>

                    {/* Nav column */}
                    <div className={styles['nav-column']}>
                        <p className={styles['column-heading']}>Menu</p>
                        <nav aria-label="Footer navigatie">
                            {FOOTER_LINKS.map(({ id, label }) => (
                                <a
                                    key={id}
                                    href={`#${id}`}
                                    className={styles.link}
                                    data-magnetic-cursor-target
                                    onClick={(e) => handleLinkClick(e, id)}
                                >
                                    <span className={styles['link-text']}>
                                        {label}
                                    </span>
                                    <span
                                        className={styles['link-bg']}
                                        data-magnetic-cursor-bg
                                    />
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Contact column */}
                    <div className={styles['contact-column']}>
                        <p className={styles['column-heading']}>Contact</p>
                        <p className={styles['contact-text']}>
                            Stuur je video via WhatsApp en ontvang binnen 48 uur
                            een persoonlijke analyse terug.
                        </p>
                        <a
                            href="https://wa.me/31629466919?text=Hoi,%20ik%20wil%20graag%20een%20video-analyse!"
                            className={styles['phone-link']}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            +31 6 29466919
                        </a>
                    </div>
                </div>

                <p className={styles.copyright}>
                    &copy; {currentYear} De Tennisdokter. Alle rechten
                    voorbehouden.
                </p>
            </div>
        </footer>
    )
}
