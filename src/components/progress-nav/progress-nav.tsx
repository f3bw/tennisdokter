'use client'

import { gsap } from 'gsap'
import Image from 'next/image'
import { useEffect, useRef, useState, useCallback } from 'react'

import { getLenis } from '@/components/lenis-provider'

import styles from './progress-nav.module.css'
import { useScrollSpy, type NavSection } from './use-scroll-spy'

const NAV_SECTIONS: NavSection[] = [
    { id: 'home', label: 'Home' },
    { id: 'over-mij', label: 'Over Mij' },
    { id: 'hoe-werkt-het', label: 'Werkwijze' },
    { id: 'voor-trainers', label: 'Voor Trainers' },
    { id: 'tarieven', label: 'Tarieven' },
    { id: 'partners', label: 'Partners' },
]

const WHATSAPP_URL =
    'https://wa.me/31612345678?text=Hoi,%20ik%20wil%20graag%20een%20video-analyse!'

export const ProgressNav = () => {
    const { activeSection, scrollToSection } = useScrollSpy(NAV_SECTIONS)
    const [navStatus, setNavStatus] = useState<'not-active' | 'active'>(
        'not-active'
    )
    const indicatorRef = useRef<HTMLSpanElement>(null)
    const navLinksRef = useRef<HTMLDivElement>(null)

    const isOpen = navStatus === 'active'

    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
            e.preventDefault()
            scrollToSection(id)
            setNavStatus('not-active')
        },
        [scrollToSection]
    )

    const toggleNav = useCallback(() => {
        setNavStatus((prev) =>
            prev === 'not-active' ? 'active' : 'not-active'
        )
    }, [])

    const closeNav = useCallback(() => {
        setNavStatus('not-active')
    }, [])

    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                closeNav()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, closeNav])

    // Prevent body scroll when drawer is open
    useEffect(() => {
        const lenis = getLenis()

        if (isOpen) {
            if (lenis) {
                lenis.stop()
            } else {
                document.body.style.overflow = 'hidden'
            }
        } else {
            if (lenis) {
                lenis.start()
            } else {
                document.body.style.overflow = ''
            }
        }

        return () => {
            if (lenis) {
                lenis.start()
            } else {
                document.body.style.overflow = ''
            }
        }
    }, [isOpen])

    // Animate indicator on desktop
    useEffect(() => {
        if (!indicatorRef.current || !navLinksRef.current) return

        const activeLink = navLinksRef.current.querySelector(
            `[data-section="${activeSection}"]`
        ) as HTMLAnchorElement

        if (!activeLink) return

        const navRect = navLinksRef.current.getBoundingClientRect()
        const linkRect = activeLink.getBoundingClientRect()

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches

        gsap.to(indicatorRef.current, {
            left: linkRect.left - navRect.left,
            width: linkRect.width,
            duration: prefersReducedMotion ? 0 : 0.5,
            ease: 'power3.out',
        })
    }, [activeSection])

    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav} aria-label="Hoofdnavigatie">
                    <a
                        href="#home"
                        className={styles.logo}
                        onClick={(e) => handleNavClick(e, 'home')}
                    >
                        <Image
                            src="/favicon.svg"
                            alt="De Tennisdokter"
                            width={40}
                            height={40}
                            className={styles['logo-img-mobile']}
                        />
                        <Image
                            src="/logos/logo-letterbox.svg"
                            alt="De Tennisdokter"
                            width={160}
                            height={30}
                            className={styles['logo-img-desktop']}
                        />
                    </a>

                    {/* Desktop navigation */}
                    <div className={styles['nav-links']} ref={navLinksRef}>
                        <span className={styles.indicator} ref={indicatorRef} />
                        {NAV_SECTIONS.map(({ id, label }) => (
                            <a
                                key={id}
                                href={`#${id}`}
                                data-section={id}
                                className={styles['nav-link']}
                                aria-current={
                                    activeSection === id ? 'page' : undefined
                                }
                                onClick={(e) => handleNavClick(e, id)}
                            >
                                <span className={styles['link-text']}>
                                    <span>{label}</span>
                                    <span aria-hidden="true">{label}</span>
                                </span>
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA - Bubble Button */}
                    <a
                        href={WHATSAPP_URL}
                        className={styles['btn-bubble']}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className={styles['btn-bubble__ball']}>
                            <svg
                                className={styles['btn-bubble__ball-svg']}
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    fill="#c8e038"
                                    stroke="#8aa626"
                                    strokeWidth="1.5"
                                />
                                <path
                                    d="M6 3.5c2.5 2 4 5 4 8.5s-1.5 6.5-4 8.5"
                                    fill="none"
                                    stroke="#fff"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M18 3.5c-2.5 2-4 5-4 8.5s1.5 6.5 4 8.5"
                                    fill="none"
                                    stroke="#fff"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                        <span className={styles['btn-bubble__content']}>
                            <span className={styles['btn-bubble__text']}>
                                Contact
                            </span>
                        </span>
                        <span
                            className={`${styles['btn-bubble__ball']} ${styles['btn-bubble__ball--duplicate']}`}
                        >
                            <svg
                                className={styles['btn-bubble__ball-svg']}
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden="true"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    fill="#c8e038"
                                    stroke="#8aa626"
                                    strokeWidth="1.5"
                                />
                                <path
                                    d="M6 3.5c2.5 2 4 5 4 8.5s-1.5 6.5-4 8.5"
                                    fill="none"
                                    stroke="#fff"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M18 3.5c-2.5 2-4 5-4 8.5s1.5 6.5 4 8.5"
                                    fill="none"
                                    stroke="#fff"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                    </a>
                </nav>
            </header>

            {/* Mobile Navigation */}
            <div
                data-navigation-status={navStatus}
                className={styles.navigation}
                aria-hidden={!isOpen}
            >
                {/* Dark overlay background */}
                <div
                    className={styles['navigation-dark-bg']}
                    onClick={closeNav}
                    aria-hidden="true"
                />

                {/* Hamburger menu container */}
                <div className={styles['hamburger-nav']}>
                    {/* Scaling background */}
                    <div className={styles['hamburger-nav-bg']} />

                    {/* Menu content */}
                    <div className={styles['hamburger-nav-group']}>
                        <p className={styles['hamburger-nav-menu-label']}>
                            Menu
                        </p>
                        <ul className={styles['hamburger-nav-ul']}>
                            {NAV_SECTIONS.map(({ id, label }) => (
                                <li
                                    key={id}
                                    className={styles['hamburger-nav-li']}
                                >
                                    <a
                                        href={`#${id}`}
                                        className={styles['hamburger-nav-a']}
                                        aria-current={
                                            activeSection === id
                                                ? 'page'
                                                : undefined
                                        }
                                        onClick={(e) => handleNavClick(e, id)}
                                        tabIndex={isOpen ? 0 : -1}
                                    >
                                        <p
                                            className={
                                                styles['hamburger-nav-p']
                                            }
                                        >
                                            {label}
                                        </p>
                                        <span
                                            className={
                                                styles['hamburger-nav-dot']
                                            }
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Toggle button */}
                    <button
                        className={styles['hamburger-nav-toggle']}
                        onClick={toggleNav}
                        aria-expanded={isOpen}
                        aria-label={isOpen ? 'Menu sluiten' : 'Menu openen'}
                    >
                        <span className={styles['hamburger-nav-toggle-bar']} />
                        <span className={styles['hamburger-nav-toggle-bar']} />
                    </button>
                </div>
            </div>
        </>
    )
}
