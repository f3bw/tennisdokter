'use client'

import Image from 'next/image'

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
                <Image
                    src="/logos/logo-ball-yellow.svg"
                    alt=""
                    width={40}
                    height={40}
                    className={styles['btn-bubble__ball-svg']}
                    aria-hidden="true"
                />
            </span>
            <span className={styles['btn-bubble__content']}>
                <span className={styles['btn-bubble__text']}>Contact</span>
            </span>
            <span
                className={`${styles['btn-bubble__ball']} ${styles['btn-bubble__ball--duplicate']}`}
            >
                <Image
                    src="/logos/logo-ball-yellow.svg"
                    alt=""
                    width={40}
                    height={40}
                    className={styles['btn-bubble__ball-svg']}
                    aria-hidden="true"
                />
            </span>
        </a>
    )
}
