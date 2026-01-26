import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
    title: 'Tennisdokter',
    description: 'Tennisdokter - Your tennis expert',
}

const RootLayout = ({
    children,
}: Readonly<{
    children: ReactNode
}>) => {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}

export default RootLayout
