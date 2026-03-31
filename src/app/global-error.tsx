'use client'

import Link from 'next/link'
import { useEffect } from 'react'

type GlobalErrorProps = {
    error: Error & { digest?: string }
    reset: () => void
}

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <html lang="nl">
            <head>
                <title>Er ging iets mis – De Tennisdokter</title>
                <meta charSet="utf-8" />
                <meta
                    content="width=device-width, initial-scale=1"
                    name="viewport"
                />
                <style>{`
                    *, *::before, *::after { box-sizing: border-box; }
                    body { margin: 0; font-family: system-ui, -apple-system, sans-serif; background: #fafcfe; color: #0a0a0a; -webkit-font-smoothing: antialiased; }
                    .page { min-height: 100dvh; display: flex; align-items: center; justify-content: center; padding: 2.5rem 1.5rem; text-align: center; }
                    .content { display: flex; flex-direction: column; align-items: center; gap: 1rem; max-width: 480px; }
                    svg { width: 72px; height: 72px; flex-shrink: 0; }
                    h1 { font-size: clamp(1.5rem, 4vw, 2.25rem); font-weight: 700; line-height: 1.2; margin: 0; }
                    p { color: #616263; font-size: 1.0625rem; line-height: 1.6; margin: 0; max-width: 360px; }
                    .actions { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: center; margin-top: 0.75rem; }
                    .btn { display: inline-flex; font-family: inherit; font-size: 0.9375rem; font-weight: 600; padding: 0.6875rem 1.75rem; border-radius: 9999px; cursor: pointer; text-decoration: none; transition: background-color 0.2s ease, color 0.2s ease, transform 0.15s ease; }
                    .btn-primary { background-color: #288739; border: 2px solid transparent; color: white; }
                    .btn-primary:hover { background-color: #1e6a2d; transform: translateY(-2px); }
                    .btn-ghost { background-color: transparent; border: 2px solid #288739; color: #288739; }
                    .btn-ghost:hover { background-color: #288739; color: white; transform: translateY(-2px); }
                `}</style>
            </head>
            <body>
                <main className="page">
                    <div className="content">
                        <svg
                            aria-hidden="true"
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

                        <h1>Er ging iets mis</h1>

                        <p>
                            Er is een onverwachte fout opgetreden. Probeer het
                            opnieuw of ga terug naar de homepage.
                        </p>

                        <div className="actions">
                            <button
                                className="btn btn-primary"
                                onClick={reset}
                                type="button"
                            >
                                Probeer opnieuw
                            </button>

                            <Link className="btn btn-ghost" href="/">
                                Terug naar home
                            </Link>
                        </div>
                    </div>
                </main>
            </body>
        </html>
    )
}

export default GlobalError
