'use client'

import dynamic from 'next/dynamic'

const MagneticCursorInner = dynamic(
    () => import('./magnetic-cursor').then((m) => m.MagneticCursor),
    { ssr: false }
)

export const MagneticCursorLazy = () => <MagneticCursorInner />
