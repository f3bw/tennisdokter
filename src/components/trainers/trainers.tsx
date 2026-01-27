import styles from './trainers.module.css'

export const Trainers = () => {
    return (
        <section id="voor-trainers" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <span className={styles.badge}>Voor Trainers</span>
                    <h2 className={styles.title}>
                        Vragen over methodiek of werkwijze?
                    </h2>
                    <p className={styles.text}>
                        Ben je tennisleraar of trainer en heb je vragen over
                        trainingsmethodes, methodiek of hoe je bepaalde
                        technieken het beste kunt overbrengen aan je leerlingen?
                    </p>
                    <p className={styles.text}>
                        Neem gerust contact met me op. Ik deel graag mijn kennis
                        en ervaring met collega-trainers. Op dit moment is dit
                        volledig gratis - ik help je graag verder!
                    </p>

                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <div className={styles['feature-icon']}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                                </svg>
                            </div>
                            <div className={styles['feature-content']}>
                                <h3 className={styles['feature-title']}>
                                    Methodiek & Didactiek
                                </h3>
                                <p className={styles['feature-description']}>
                                    Advies over trainingsopbouw en leermethodes
                                </p>
                            </div>
                        </div>

                        <div className={styles.feature}>
                            <div className={styles['feature-icon']}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                                </svg>
                            </div>
                            <div className={styles['feature-content']}>
                                <h3 className={styles['feature-title']}>
                                    Kennisdeling
                                </h3>
                                <p className={styles['feature-description']}>
                                    Sparren over techniek en trainingsvormen
                                </p>
                            </div>
                        </div>

                        <div className={styles.feature}>
                            <div className={styles['feature-icon']}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            </div>
                            <div className={styles['feature-content']}>
                                <h3 className={styles['feature-title']}>
                                    Momenteel Gratis
                                </h3>
                                <p className={styles['feature-description']}>
                                    Geen kosten voor collega-trainers
                                </p>
                            </div>
                        </div>
                    </div>

                    <a
                        href="https://wa.me/31612345678?text=Hoi,%20ik%20ben%20tennisleraar%20en%20heb%20een%20vraag."
                        className={styles.cta}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Neem contact op
                    </a>
                </div>
            </div>
        </section>
    )
}
