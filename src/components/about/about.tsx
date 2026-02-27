import Image from 'next/image'

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
                        Inmiddels 40 jaar fulltime ervaring met het begeleiden
                        van spelers t/m niveau 3. Al 34 jaar werkzaam bij
                        dezelfde tennisvereniging. Van tennisleraar tot opleider
                        jeugd tot en met nationale ranglijst. Veel leerlingen,
                        zowel jeugd als volwassenen, die al meer dan 20
                        seizoenen achter elkaar les hebben.
                    </p>

                    <p className={styles.text}>
                        Met mijn achtergrond en ervaring help ik tennissers
                        zichzelf te verbeteren door middel van persoonlijke
                        video-analyse. Niet zoals vele trainers met YouTube
                        video&apos;s over hoe toppers het doen, maar oplossingen
                        op jouw niveau om dingen verder te brengen. Ik bekijk je
                        video en geef concrete aanwijzingen en oplossingen.
                        Custommade!
                    </p>

                    <ul className={styles.highlights}>
                        <li className={styles['highlight-item']}>
                            <span className={styles['highlight-icon']}>✓</span>
                            40 jaar trainerservaring
                        </li>
                        <li className={styles['highlight-item']}>
                            <span className={styles['highlight-icon']}>✓</span>
                            34 jaar bij dezelfde middelgrote vereniging
                            <Image
                                src="/brands/TVR Logo.svg"
                                alt="TVR"
                                width={120}
                                height={60}
                                className={styles['highlight-brand']}
                            />
                        </li>

                        <li className={styles['highlight-item']}>
                            <span className={styles['highlight-icon']}>✓</span>
                            Bezit acte PABO (leerkracht basisonderwijs)
                        </li>

                        <li className={styles['highlight-item']}>
                            <span className={styles['highlight-icon']}>✓</span>
                            Persoonlijke analyse op jouw niveau
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
