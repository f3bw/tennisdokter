import styles from './pricing.module.css'

export const Pricing = () => {
    return (
        <section id="tarieven" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Tarieven</h2>
                    <p className={styles.subtitle}>
                        Transparant en betaalbaar
                    </p>
                </div>

                <div className={styles.card}>
                    <div className={styles['card-header']}>
                        <h3 className={styles['card-title']}>Video-analyse</h3>
                        <div className={styles['card-price']}>
                            <span className={styles['price-amount']}>€10</span>
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

                    <a
                        href="https://wa.me/31612345678?text=Hoi,%20ik%20wil%20graag%20een%20video-analyse!"
                        className={styles['card-cta']}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-magnetic-cursor-target
                    >
                        <span className={styles['card-cta-inner']}>
                            Start via WhatsApp
                        </span>
                        <span
                            className={styles['card-cta-bg']}
                            data-magnetic-cursor-bg
                        />
                    </a>
                </div>

                <p className={styles.note}>
                    Na ontvangst van je video-analyse stuur ik je een Tikkie.
                    Simpel en zonder gedoe.
                </p>
            </div>
        </section>
    )
}
