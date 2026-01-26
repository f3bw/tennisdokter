import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import { ComponentPropsWithRef, ReactNode } from 'react'

import { cn } from '@/utils/cn'

import styles from './content-card.module.css'

const cardVariants = cva(styles.base, {
    variants: {
        layout: {
            stacked: styles.stacked,
            horizontal: styles.horizontal,
        },
    },
    defaultVariants: {
        layout: 'stacked',
    },
})

type ContentCardProps = ComponentPropsWithRef<'article'> &
    VariantProps<typeof cardVariants> & {
        children: ReactNode
    }

export const ContentCard = ({
    className,
    layout,
    children,
    ...props
}: ContentCardProps) => {
    return (
        <article
            className={cn(
                cardVariants({
                    layout,
                }),
                className
            )}
            {...props}
        >
            {children}
        </article>
    )
}

type ContentCardImageProps = ComponentPropsWithRef<'div'> & {
    children: ReactNode
}

const ContentCardImage = ({
    className,
    children,
    ...props
}: ContentCardImageProps) => {
    return (
        <div className={cn(styles.image, className)} {...props}>
            {children}
        </div>
    )
}
ContentCardImage.displayName = 'ContentCardImage'

type ContentCardBodyProps = ComponentPropsWithRef<'div'> & {
    children: ReactNode
}

const ContentCardBody = ({
    className,
    children,
    ...props
}: ContentCardBodyProps) => {
    return (
        <div className={cn(styles.body, className)} {...props}>
            {children}
        </div>
    )
}
ContentCardBody.displayName = 'ContentCardBody'

type ContentCardTitleProps = ComponentPropsWithRef<'h3'> & {
    children: ReactNode
    href?: string
}

const ContentCardTitle = ({
    className,
    children,
    href,
    ...props
}: ContentCardTitleProps) => {
    if (href) {
        return (
            <h3 className={cn(styles.title, className)} {...props}>
                <Link href={href} className={styles['title-link']}>
                    {children}
                </Link>
            </h3>
        )
    }

    return (
        <h3 className={cn(styles.title, className)} {...props}>
            {children}
        </h3>
    )
}
ContentCardTitle.displayName = 'ContentCardTitle'

type ContentCardDescriptionProps = ComponentPropsWithRef<'p'> & {
    children: ReactNode
}

const ContentCardDescription = ({
    className,
    children,
    ...props
}: ContentCardDescriptionProps) => {
    return (
        <p className={cn(styles.description, className)} {...props}>
            {children}
        </p>
    )
}
ContentCardDescription.displayName = 'ContentCardDescription'

type ContentCardCtaProps = ComponentPropsWithRef<'div'> & {
    children: ReactNode
}

const ContentCardCta = ({
    className,
    children,
    ...props
}: ContentCardCtaProps) => {
    return (
        <div className={cn(styles.cta, className)} {...props}>
            {children}
        </div>
    )
}
ContentCardCta.displayName = 'ContentCardCta'

type ContentCardFooterProps = ComponentPropsWithRef<'div'> & {
    children: ReactNode
}

const ContentCardFooter = ({
    className,
    children,
    ...props
}: ContentCardFooterProps) => {
    return (
        <div className={cn(styles.footer, className)} {...props}>
            {children}
        </div>
    )
}
ContentCardFooter.displayName = 'ContentCardFooter'

ContentCard.Image = ContentCardImage
ContentCard.Body = ContentCardBody
ContentCard.Title = ContentCardTitle
ContentCard.Description = ContentCardDescription
ContentCard.Cta = ContentCardCta
ContentCard.Footer = ContentCardFooter
