import styles from './how-it-works.module.css'

const steps = [
    {
        number: '1',
        title: 'Film jezelf',
        description:
            'Maak een video van je slag (forehand, backhand, service, etc.) en stuur deze via WhatsApp samen met je vraag.',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
        ),
    },
    {
        number: '2',
        title: 'Ontvang analyse',
        description:
            'Ik bekijk je video en maak een persoonlijke video-analyse met concrete tips en oefeningen.',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
        ),
    },
    {
        number: '3',
        title: 'Betaal via Tikkie',
        description:
            'Na ontvangst van je analyse betaal je eenvoudig €10 via Tikkie. Geen gedoe, geen abonnement.',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
            </svg>
        ),
    },
]

export const HowItWorks = () => {
    return (
        <section id="hoe-werkt-het" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Hoe Werkt Het?</h2>
                    <p className={styles.subtitle}>
                        In drie simpele stappen naar beter tennis
                    </p>
                </div>

                <div className={styles.steps}>
                    {steps.map((step) => (
                        <div key={step.number} className={styles.step}>
                            <div className={styles['step-icon']}>{step.icon}</div>
                            <div className={styles['step-number']}>
                                Stap {step.number}
                            </div>
                            <h3 className={styles['step-title']}>{step.title}</h3>
                            <p className={styles['step-description']}>
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className={styles.cta}>
                    <a
                        href="https://wa.me/31612345678?text=Hoi,%20ik%20wil%20graag%20een%20video-analyse!"
                        className={styles['cta-button']}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Start nu via WhatsApp
                    </a>
                </div>
            </div>
        </section>
    )
}
