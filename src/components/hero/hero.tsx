'use client'

import dynamic from 'next/dynamic'

import { MagneticButton } from '@/components/magnetic-button'

import styles from './hero.module.css'

const FallingBalls = dynamic(
    () => import('./falling-balls').then((mod) => mod.FallingBalls),
    { ssr: false }
)

export const Hero = () => {
    return (
        <section id="home" className={styles.hero}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <h1 className={styles['logo-title']}>
                        de<span className={styles.bold}>tennisdokter</span>
                    </h1>

                    <p className={styles.tagline}>
                        Verbeter jouw tennis met een persoonlijk videoadvies van
                        Ferdinand Werger, dé populaire tennisdokter met 40 jaar
                        ervaring als tennisleraar!
                    </p>

                    <p className={styles.description}>
                        Wacht niet langer en pak jouw telefoon – maak een video
                        van je tennisbeweging en stel jouw vraag of deel jouw
                        struikelblok. Voor €10 ontvang jij van mij een
                        deskundige analyse met praktische tips via Whatsapp,
                        speciaal en alleen op jou afgestemd. Ontdek hoe kleine
                        aanpassingen direct zorgen voor meer plezier,
                        vooruitgang en succes op de baan!
                    </p>

                    <MagneticButton
                        href="https://wa.me/31629466919?text=Hoi,%20ik%20wil%20graag%20een%20video-analyse!"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Start via WhatsApp
                    </MagneticButton>

                    <p className={styles.price}>
                        <span className={styles['price-amount']}>€10</span>
                        <span className={styles['price-text']}>
                            per video-analyse
                        </span>
                    </p>
                </div>

                <div className={styles.visual}>
                    <FallingBalls />
                </div>
            </div>

            <div className={styles.decoration} aria-hidden="true" />
        </section>
    )
}
