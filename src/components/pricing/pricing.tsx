import { MagneticButton } from '@/components/magnetic-button'

import styles from './pricing.module.css'

export const Pricing = () => {
    return (
        <section id="tarieven" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Tarieven</h2>
                    <p className={styles.subtitle}>Transparant en betaalbaar</p>
                </div>

                <div className={styles['card-wrapper']}>
                    <div className={styles.stamp} aria-hidden="true">
                        <svg
                            viewBox="0 0 200 200"
                            className={styles['stamp-svg']}
                        >
                            <circle cx="100" cy="100" r="98" fill="#f08118" />
                            <circle
                                cx="100"
                                cy="100"
                                r="90"
                                fill="none"
                                stroke="#0a0a0a"
                                strokeWidth="0"
                            />
                            <circle
                                cx="100"
                                cy="100"
                                r="72"
                                fill="none"
                                stroke="#0a0a0a"
                                strokeWidth="1.5"
                            />
                            <image
                                href="/logos/logo-transparant.svg"
                                x="68"
                                y="68"
                                width="64"
                                height="64"
                            />
                            <defs>
                                <path
                                    id="stamp-curve-top"
                                    d="M 16,100 a 84,84 0 0,1 168,0"
                                />
                                <path
                                    id="stamp-curve-bottom"
                                    d="M 184,100 a 84,84 0 0,1 -168,0"
                                />
                            </defs>
                            <text
                                className={styles['stamp-text']}
                                dominantBaseline="middle"
                            >
                                <textPath
                                    href="#stamp-curve-top"
                                    startOffset="50%"
                                    textAnchor="middle"
                                >
                                    ADVIES OP MAAT
                                </textPath>
                            </text>
                            <text
                                className={styles['stamp-text']}
                                dominantBaseline="middle"
                            >
                                <textPath
                                    href="#stamp-curve-bottom"
                                    startOffset="50%"
                                    textAnchor="middle"
                                >
                                    VIDEO-ANALYSE
                                </textPath>
                            </text>
                        </svg>
                    </div>

                    <div className={styles.card}>
                        <div className={styles['card-header']}>
                            <h3 className={styles['card-title']}>
                                Video-analyse
                            </h3>
                            <div className={styles['card-price']}>
                                <span className={styles['price-amount']}>
                                    €10
                                </span>
                                <span className={styles['price-period']}>
                                    per analyse
                                </span>
                            </div>
                        </div>

                        <ul className={styles['card-features']}>
                            <li className={styles['card-feature']}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                Persoonlijke video-analyse
                            </li>
                            <li className={styles['card-feature']}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                Concrete tips & oefeningen
                            </li>
                            <li className={styles['card-feature']}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                Video-uitleg retour
                            </li>
                            <li className={styles['card-feature']}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                Betaling via Tikkie
                            </li>
                            <li className={styles['card-feature']}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                Geen abonnement nodig
                            </li>
                        </ul>

                        <div className={styles['card-cta-wrapper']}>
                            <MagneticButton
                                href="https://wa.me/31612345678?text=Hoi,%20ik%20wil%20graag%20een%20video-analyse!"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles['card-cta']}
                            >
                                Start via WhatsApp
                            </MagneticButton>
                        </div>
                    </div>
                </div>

                <p className={styles.note}>
                    Na ontvangst van je video-analyse stuur ik je een Tikkie.
                    Simpel en zonder gedoe.
                </p>
            </div>
        </section>
    )
}
