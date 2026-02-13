'use client'

import { useMagneticButton } from '@/hooks/use-magnetic-button'

import styles from './magnetic-button.module.css'

interface MagneticButtonProps {
    href: string
    children: string
    target?: string
    rel?: string
    className?: string
    variant?: 'primary' | 'light'
}

export const MagneticButton = ({
    href,
    children,
    target,
    rel,
    className,
    variant = 'primary',
}: MagneticButtonProps) => {
    const buttonRef = useMagneticButton<HTMLAnchorElement>({
        strength: 50,
        innerStrength: 25,
    })

    return (
        <a
            ref={buttonRef}
            href={href}
            className={`${styles.button} ${styles[variant]} ${className || ''}`}
            target={target}
            rel={rel}
        >
            <span className={styles.fill} />
            <span className={styles.content} data-magnetic-inner>
                <span className={styles.text}>
                    <span className={styles['text-main']}>{children}</span>
                </span>
            </span>
        </a>
    )
}
