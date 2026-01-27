'use client'

import styles from './whatsapp-button.module.css'

export const WhatsAppButton = () => {
    return (
        <a
            href="https://wa.me/31612345678?text=Hoi,%20ik%20wil%20graag%20een%20video-analyse!"
            className={styles['btn-bubble']}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact via WhatsApp"
        >
            <span className={styles['btn-bubble__ball']}>
                <svg
                    className={styles['btn-bubble__ball-svg']}
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                >
                    <circle cx="12" cy="12" r="10" fill="#c8e038" stroke="#8aa626" strokeWidth="1.5" />
                    <path
                        d="M6 3.5c2.5 2 4 5 4 8.5s-1.5 6.5-4 8.5"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    />
                    <path
                        d="M18 3.5c-2.5 2-4 5-4 8.5s1.5 6.5 4 8.5"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    />
                </svg>
            </span>
            <span className={styles['btn-bubble__content']}>
                <span className={styles['btn-bubble__text']}>Contact</span>
            </span>
            <span
                className={`${styles['btn-bubble__ball']} ${styles['btn-bubble__ball--duplicate']}`}
            >
                <svg
                    className={styles['btn-bubble__ball-svg']}
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                >
                    <circle cx="12" cy="12" r="10" fill="#c8e038" stroke="#8aa626" strokeWidth="1.5" />
                    <path
                        d="M6 3.5c2.5 2 4 5 4 8.5s-1.5 6.5-4 8.5"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    />
                    <path
                        d="M18 3.5c-2.5 2-4 5-4 8.5s1.5 6.5 4 8.5"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                    />
                </svg>
            </span>
        </a>
    )
}
