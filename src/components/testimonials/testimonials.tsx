'use client'

import { useRef } from 'react'

import { useCenteredSlider } from '@/hooks/use-centered-slider'

import styles from './testimonials.module.css'

const SLIDES = [
    {
        name: 'Antione',
        role: 'Niveau 4',
        quote: 'Ik train al 20+ jaar bij Ferdinand, en dat is altijd supergoed bevallen. Hij is (minstens) net zo tennisgek als ik, gaat altijd voor de persoonlijke aanpak door te kijken wat bij jouw lichaam/spel past, en heeft heel veel technische kennis. Kortom: een hele fijne trainer met superveel ervaring!',
    },
    {
        name: 'Marcel',
        role: 'niveau 6',
        quote: 'Ik tennis al meer dan 20 jaar bij en met Ferdinand. En toch weet hij iedere keer iets te wijzigen of te  experimenteren om te zien of het resultaat beter is. Al gaat het maar over een racket stand verandering van 1 mm.',
    },
    {
        name: 'Joop',
        role: 'Niveau 8/7',
        quote: 'Toen mij werd gevraagd iets te schrijven voor De Tennisdokter, ben ik teruggeblikt op het begin van mijn tennisavontuur. Het begon allemaal na mijn pensionering, een periode waarin sport nauwelijks een plek had in mijn leven. Via een kennis die al op een tennisschool zat, kwam ik voor het eerst in aanraking met tennis. Zij was op zoek naar een partner om samen te spelen en wist mij te overtuigen om samen een cursus te volgen bij haar tennisleraar, Ferdinand Werger. We kregen wekelijks samen een half uur les van hem. Kort daarna stopte mijn kennis, maar ik besloot door te gaan. Tennis begon mij steeds meer te bevallen. Ik ging vaker en intensiever spelen, ook met anderen in verschillende clubjes. Ondanks deze nieuwe contacten bleef ik trouw deelnemen aan zijn lessen. Zo ben ik in de afgelopen 15 jaar steeds fanatieker en beter geworden in het tennis, vooral dankzij zijn enthousiaste en zeer deskundige begeleiding. Inmiddels staat Ferdinand op het punt zijn 40-jarig jubileum te vieren. Het is bijzonder dat hij nu als ‘de Tennisdokter’ zijn deskundigheid op deze vernieuwende en toegankelijke wijze met iedereen wil delen – wat een geweldig initiatief! Ik wens jou veel succes en voldoening toe in jouw nieuwe rol als ‘De Tennisdokter’!',
    },
    {
        name: 'Yvonne',
        role: 'Niveau 8',
        quote: 'Dankzij mijn tennisleraar Ferdinand Werger speel ik op gevorderde leeftijd nog met veel enthousiasme en plezier – en ik word nog steeds fanatieker en beter in het tennisspel! Hij is dé Tennisdokter bij uitstek en van harte aan te raden.',
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
