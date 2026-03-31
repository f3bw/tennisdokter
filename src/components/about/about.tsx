import Image from 'next/image'

import styles from './about.module.css'

export const About = () => {
    return (
        <section id="over-mij" className={styles.about}>
            <div className={styles.container}>
                <div className={styles.image}>
                    <Image
                        src="/images/headshot-ferdinand-werger.jpeg"
                        alt="Ferdinand Werger"
                        width={400}
                        height={500}
                        className={styles['image-photo']}
                    />
                </div>

                <div className={styles.content}>
                    <h2 className={styles.title}>Wie ben ik</h2>

                    <p className={styles.text}>
                        Ik ben Ferdinand Werger, al 40 jaar full time
                        tennisleraar met een zeer ruime ervaring in het
                        begeleiden van spelers t/m niveau 3. Ik werk al 34 jaar
                        bij Tennis en Padelvereniging Roosendaal (TPR), waar ik
                        lesgeef aan alle doelgroepen. Van jonge jeugd tot
                        volwassenen en van recreatieve spelers t/m kinderen op
                        de nationale ranglijst. Als ervaren trainer werk je vaak
                        meer dan 20 seizoenen met fanatieke en talentvolle
                        spelers!
                    </p>

                    <p className={styles.text}>
                        Met mijn achtergrond en ervaring help ik tennissers
                        zichzelf te verbeteren door middel van persoonlijke
                        video-analyse.
                        <strong>
                            &nbsp; Niet zoals vele trainers met YouTube
                            video&apos;s over hoe toppers het doen, maar
                            oplossingen op jouw niveau om dingen verder te
                            brengen. &nbsp;
                        </strong>
                        Ik bekijk je video en geef concrete aanwijzingen en
                        oplossingen. Custommade!
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
