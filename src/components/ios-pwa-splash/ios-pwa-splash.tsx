'use client'

import Script from 'next/script'

export const IosPwaSplash = () => {
    return (
        <Script
            src="https://unpkg.com/ios-pwa-splash@1.0.0/cdn.min.js"
            strategy="afterInteractive"
            onLoad={() => {
                // @ts-expect-error - iosPWASplash is loaded from external script
                if (typeof iosPWASplash !== 'undefined') {
                    // @ts-expect-error - iosPWASplash is loaded from external script
                    iosPWASplash('/apple-touch-icon.png', '#FFFFFF')
                }
            }}
        />
    )
}
