'use client'

import { useEffect } from 'react'

import { MagneticButton } from '@/components/magnetic-button'
import { paths } from '@/config/paths'

import styles from './error.module.css'

type ErrorPageProps = {
    error: Error & { digest?: string }
    reset: () => void
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <main className={styles.page}>
            <div className={styles.content}>
                <svg
                    aria-hidden="true"
                    className={styles.icon}
                    fill="none"
                    viewBox="0 0 80 80"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="40" cy="40" fill="#fff7ed" r="38" />
                    <circle
                        cx="40"
                        cy="40"
                        r="38"
                        stroke="#f97316"
                        strokeWidth="2"
                    />
                    <rect
                        fill="#f97316"
                        height="24"
                        rx="3"
                        width="6"
                        x="37"
                        y="18"
                    />
                    <circle cx="40" cy="55" fill="#f97316" r="4" />
                </svg>

                <h1 className={styles.title}>Er ging iets mis</h1>

                <p className={styles.description}>
                    Er is een onverwachte fout opgetreden. Probeer het opnieuw
                    of ga terug naar de homepage.
                </p>

                <div className={styles.actions}>
                    <MagneticButton href={paths.home.getHref()}>
                        Terug naar home
                    </MagneticButton>

                    <button
                        className={styles['button-underline']}
                        onClick={reset}
                        type="button"
                    >
                        Probeer opnieuw
                    </button>
                </div>
            </div>
        </main>
    )
}

export default ErrorPage
