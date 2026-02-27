'use client'

import { useRef } from 'react'

import { useCenteredSlider } from '@/hooks/use-centered-slider'

import styles from './testimonials.module.css'

const SLIDES = [
    {
        name: 'Jan de Boer',
        role: 'Recreatieve speler',
        quote: 'Na één analyse had ik direct concrete punten om aan te werken. Mijn forehand is echt een stuk stabieler geworden. Aanrader voor iedereen die serieus wil verbeteren!',
    },
    {
        name: 'Marieke van Dam',
        role: 'Competitiespeler (niveau 4)',
        quote: 'Ik was sceptisch over een online analyse, maar de feedback was verrassend persoonlijk en to-the-point. Geen algemene tips maar echt gericht op mijn specifieke problemen.',
    },
    {
        name: 'Peter Smits',
        role: 'Tennisliefhebber',
        quote: 'Voor €10 krijg je meer dan van een normale les. De video-analyse laat je precies zien wat je doet en waarom het beter kan. Heel duidelijk uitgelegd.',
    },
    {
        name: 'Linda Bakker',
        role: 'Recreatieve speelster',
        quote: 'Mijn service was altijd mijn zwakke punt. De tennisdokter heeft me in één analyse laten inzien wat ik anders moest doen. Nu sla ik dubbel zoveel services in.',
    },
    {
        name: 'Tom Visser',
        role: 'Jeugdspeler (niveau 2)',
        quote: 'Super waardevolle feedback! Het is fijn dat er gekeken wordt naar jouw niveau en niet naar hoe een prof het doet. Echt maatwerk advies.',
    },
    {
        name: 'Sandra Jansen',
        role: 'Competitiespeler (niveau 5)',
        quote: 'Binnen 24 uur reactie met een uitgebreide video-analyse. De tips waren helder en direct toepasbaar. Ik kom zeker terug voor meer analyses!',
    },
    {
        name: 'Rob Vermeer',
        role: 'Recreatieve speler',
        quote: 'Eindelijk iemand die kijkt naar hoe ík speel en niet naar hoe het theoretisch moet. De persoonlijke aanpak maakt echt het verschil. Geweldig initiatief!',
    },
    {
        name: 'Emma Hofman',
        role: 'Competitiespeler (niveau 4)',
        quote: 'De analyse was zo gedetailleerd dat ik meteen naar de baan wilde om het toe te passen. En het werkt! Mijn backhand is in twee weken enorm vooruitgegaan.',
    },
]

const getInitials = (name: string) =>
    name
        .split(' ')
        .slice(0, 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase()

export const Testimonials = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    useCenteredSlider(containerRef)

    return (
        <section id="ervaringen" className={styles.section} ref={containerRef}>
            <div className={styles.header}>
                <div className={styles['header-inner']}>
                    <h2 className={styles.title}>Ervaringen</h2>
                    <p className={styles.subtitle}>
                        Wat tennissers zeggen over de video-analyse
                    </p>
                </div>
            </div>

            <div
                aria-label="Ervaringen slider"
                className={styles.wrapper}
                data-centered-slider="wrapper"
                data-slider-autoplay="true"
                data-slider-autoplay-duration="5"
            >
                {/* ── Bullets ──────────────────────────────────── */}
                <div className={styles.container}>
                    <div className={styles.content}>
                        <ul role="tablist" className={styles['bullet-list']}>
                            {SLIDES.map((slide, i) => (
                                <li key={i} className={styles['bullet-item']}>
                                    <button
                                        data-centered-slider="bullet"
                                        role="tab"
                                        aria-selected="false"
                                        aria-label={slide.name}
                                        className={styles.bullet}
                                    >
                                        <svg
                                            className={styles['bullet-ring']}
                                            viewBox="0 0 40 40"
                                            aria-hidden="true"
                                        >
                                            <circle
                                                className={
                                                    styles['bullet-ring-track']
                                                }
                                                cx="20"
                                                cy="20"
                                                r="23"
                                            />
                                            <circle
                                                className={
                                                    styles['bullet-ring-fill']
                                                }
                                                cx="20"
                                                cy="20"
                                                r="23"
                                            />
                                        </svg>
                                        <span
                                            className={styles['bullet-initial']}
                                            aria-hidden="true"
                                        >
                                            {getInitials(slide.name)}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ── Slides ───────────────────────────────────── */}
                <div className={styles.row}>
                    <div
                        aria-label="slides"
                        data-centered-slider="list"
                        role="group"
                        className={styles.list}
                    >
                        {SLIDES.map((slide, i) => (
                            <div
                                key={i}
                                data-centered-slider="slide"
                                className={styles.slide}
                            >
                                <div className={styles['slide-inner']}>
                                    <p className={styles.description}>
                                        {slide.quote}
                                    </p>
                                    <div className={styles.details}>
                                        <span
                                            className={styles.avatar}
                                            aria-hidden="true"
                                        >
                                            {getInitials(slide.name)}
                                        </span>
                                        <div className={styles['name-group']}>
                                            <span className={styles.name}>
                                                {slide.name}
                                            </span>
                                            <span className={styles.role}>
                                                {slide.role}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Prev / Next buttons ───────────────────────── */}
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.buttons}>
                            <button
                                aria-label="Vorige ervaringen"
                                data-centered-slider="prev-button"
                                className={`${styles.button} ${styles['button-prev']}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100%"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className={styles['button-arrow']}
                                >
                                    <path
                                        d="M14 19L21 12L14 5"
                                        stroke="currentColor"
                                        strokeMiterlimit="10"
                                    />
                                    <path
                                        d="M21 12H2"
                                        stroke="currentColor"
                                        strokeMiterlimit="10"
                                    />
                                </svg>
                            </button>
                            <button
                                aria-label="Volgende ervaringen"
                                data-centered-slider="next-button"
                                className={styles.button}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100%"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className={styles['button-arrow']}
                                >
                                    <path
                                        d="M14 19L21 12L14 5"
                                        stroke="currentColor"
                                        strokeMiterlimit="10"
                                    />
                                    <path
                                        d="M21 12H2"
                                        stroke="currentColor"
                                        strokeMiterlimit="10"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
