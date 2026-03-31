import Image from 'next/image'

import { MagneticButton } from '@/components/magnetic-button'
import { paths } from '@/config/paths'

import styles from './not-found.module.css'

const NotFoundPage = () => {
    return (
        <main className={styles.page}>
            <div className={styles.content}>
                <Image
                    alt=""
                    aria-hidden="true"
                    className={styles.ball}
                    height={80}
                    src="/logos/logo-ball-yellow.svg"
                    width={80}
                />

                <p aria-hidden="true" className={styles.code}>
                    404
                </p>

                <h1 className={styles.title}>Pagina niet gevonden</h1>

                <p className={styles.description}>
                    De pagina die je zoekt bestaat niet of is verplaatst. Ga
                    terug naar de homepage om verder te gaan.
                </p>

                <div className={styles.actions}>
                    <MagneticButton href={paths.home.getHref()}>
                        Terug naar home
                    </MagneticButton>
                </div>
            </div>
        </main>
    )
}

export default NotFoundPage
