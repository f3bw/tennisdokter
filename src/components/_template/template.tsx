import { cva, type VariantProps } from 'class-variance-authority'
import { ComponentPropsWithRef } from 'react'

import { cn } from '@/utils/cn'

import styles from './template.module.css'

const templateVariants = cva(styles.base, {
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

type TemplateProps = ComponentPropsWithRef<'div'> &
    VariantProps<typeof templateVariants>

export const Template = ({ className, layout, ...props }: TemplateProps) => {
    return (
        <div
            className={cn(
                templateVariants({
                    layout,
                }),
                className
            )}
            {...props}
        >
            Nothing to see here...
        </div>
    )
}
