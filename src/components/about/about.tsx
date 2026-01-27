import styles from './about.module.css'

export const About = () => {
    return (
        <section id="over-mij" className={styles.about}>
            <div className={styles.container}>
                <div className={styles.image}>
                    <div className={styles['image-placeholder']}>
                        <svg
                            className={styles['image-icon']}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        <span className={styles['image-text']}>Foto</span>
                    </div>
                </div>

                <div className={styles.content}>
                    <h2 className={styles.title}>Over Mij</h2>

                    <p className={styles.text}>
                        Hallo! Ik ben [Jouw Naam], tenniscoach met meer dan [X]
                        jaar ervaring in het begeleiden van spelers op alle
                        niveaus.
                    </p>

                    <p className={styles.text}>
                        Met mijn achtergrond als [certificeringen/ervaring] help
                        ik tennissers hun techniek te verbeteren door middel van
                        persoonlijke video-analyse. Of het nu gaat om je
                        forehand, backhand, service of voetenwerk - ik bekijk je
                        video en geef concrete tips die je direct kunt toepassen.
                    </p>

                    <ul className={styles.highlights}>
                        <li className={styles['highlight-item']}>
                            <span className={styles['highlight-icon']}>✓</span>
                            [X] jaar tenniservaring
                        </li>
                        <li className={styles['highlight-item']}>
                            <span className={styles['highlight-icon']}>✓</span>
                            Gecertificeerd tennisleraar
                        </li>
                        <li className={styles['highlight-item']}>
                            <span className={styles['highlight-icon']}>✓</span>
                            Honderden spelers geholpen
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
