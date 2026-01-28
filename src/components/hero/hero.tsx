'use client'

import dynamic from 'next/dynamic'

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
                        de<span className="bold">tennisdokter</span>
                    </h1>

                    <p className={styles.tagline}>
                        Verbeter je tennis met persoonlijk videoadvies
                    </p>

                    <p className={styles.description}>
                        Stuur een video van je slag, met je vraag of probleem,
                        ontvang professionele analyse en oplossende tips terug.
                    </p>

                    <a
                        href="https://wa.me/31612345678?text=Hoi,%20ik%20wil%20graag%20een%20video-analyse!"
                        className={styles.cta}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-magnetic-cursor-target
                    >
                        <span className={styles['cta-inner']}>
                            Start via WhatsApp
                        </span>
                        <span
                            className={styles['cta-bg']}
                            data-magnetic-cursor-bg
                        />
                    </a>

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
