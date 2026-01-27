import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { DocumentTitle } from '@/components/document-title'
import { IosPwaSplash } from '@/components/ios-pwa-splash'
import { LenisProvider } from '@/components/lenis-provider'
import { MagneticCursor } from '@/components/magnetic-cursor'
import { ProgressNav } from '@/components/progress-nav'
import '@/styles/globals.css'

export const metadata: Metadata = {
    title: 'De Tennisdokter | Persoonlijk Videoadvies voor Tennis',
    description:
        'Verbeter je tennis met persoonlijk videoadvies. Stuur je video via WhatsApp en ontvang professionele analyse met concrete tips. €10 per analyse.',
    keywords: [
        'tennis',
        'tennisles',
        'video analyse',
        'tennis coach',
        'tennisdokter',
        'forehand',
        'backhand',
        'service',
    ],
    manifest: '/site.webmanifest',
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/favicon.svg', type: 'image/svg+xml' },
        ],
        apple: '/apple-touch-icon.png',
    },
    appleWebApp: {
        capable: true,
        title: 'detennisdokter',
        statusBarStyle: 'default',
    },
    openGraph: {
        title: 'De Tennisdokter | Persoonlijk Videoadvies voor Tennis',
        description:
            'Verbeter je tennis met persoonlijk videoadvies. Stuur je video via WhatsApp en ontvang professionele analyse met concrete tips.',
        url: 'https://detennisdokter.com',
        siteName: 'De Tennisdokter',
        locale: 'nl_NL',
        type: 'website',
    },
}

export const viewport: Viewport = {
    themeColor: '#FFFFFF',
}

const RootLayout = ({
    children,
}: Readonly<{
    children: ReactNode
}>) => {
    return (
        <html lang="nl">
            <head>
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-touch-fullscreen" content="yes" />
            </head>
            <body>
                <LenisProvider>
                    <MagneticCursor />
                    <DocumentTitle />
                    <ProgressNav />
                    {children}
                    <IosPwaSplash />
                </LenisProvider>
            </body>
        </html>
    )
}

export default RootLayout
