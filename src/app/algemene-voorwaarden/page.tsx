import type { Metadata } from 'next'
import Link from 'next/link'

import styles from './page.module.css'

export const metadata: Metadata = {
    title: 'Algemene Voorwaarden | De Tennisdokter',
    description:
        'Lees de algemene voorwaarden van De Tennisdokter voor video-analyse diensten.',
    robots: { index: false, follow: false },
}

const AlgemeneVoorwaardenPage = () => {
    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <Link href="/" className={styles.back}>
                    ← Terug naar home
                </Link>

                <h1 className={styles.title}>Algemene Voorwaarden</h1>
                <p className={styles.intro}>
                    De Tennisdokter &mdash; Video-analyse dienst
                </p>

                <section className={styles.section}>
                    <h2 className={styles.heading}>1. Reactietijd</h2>
                    <p className={styles.text}>
                        Na ontvangst van je video neem ik binnen <strong>24 uur</strong> contact met je op om de ontvangst te bevestigen.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.heading}>2. Levertijd analyse</h2>
                    <p className={styles.text}>
                        De video-analyse wordt geleverd binnen <strong>9 dagen</strong> na ontvangst van je video en betaling via Tikkie.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.heading}>3. Aansprakelijkheid</h2>
                    <p className={styles.text}>
                        De Tennisdokter is niet aansprakelijk voor blessures en/of materiaalpech die ontstaan voor, tijdens of na het opvolgen van de gegeven adviezen en aanwijzingen.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.heading}>4. Slagontwikkeling en meerdere contactmomenten</h2>
                    <p className={styles.text}>
                        Omdat ook juist de volgorde van aanwijzingen 100% bijdraagt aan de snelle ontwikkeling van je slag, kan het zijn dat het opbouwen van een slag naar niveau 6 en verder meerdere contactmomenten nodig heeft. Vandaar dat de prijsstelling zo laagdrempelig is in verhouding tot een gewone tennisles op de baan.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.heading}>5. Betaling en facturatie</h2>
                    <p className={styles.text}>
                        Betaling verloopt via Tikkie. Naast de betaling via Tikkie ontvang je ook een officiële factuur ten behoeve van mijn financiële administratie.
                    </p>
                </section>

                <p className={styles.footer}>
                    Door contact op te nemen en een video in te sturen ga je akkoord met deze algemene voorwaarden.
                </p>
            </div>
        </main>
    )
}

export default AlgemeneVoorwaardenPage
