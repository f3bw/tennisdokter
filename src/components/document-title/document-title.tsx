'use client'

import { useEffect, useRef } from 'react'

const TITLE_ON_BLUR = '🎾 Ga je nu al? De rally is nog in volle gang!'

export const DocumentTitle = () => {
    const originalTitleRef = useRef<string>('')

    useEffect(() => {
        originalTitleRef.current = document.title

        const handleFocus = () => {
            document.title = originalTitleRef.current
        }

        const handleBlur = () => {
            document.title = TITLE_ON_BLUR
        }

        window.addEventListener('focus', handleFocus)
        window.addEventListener('blur', handleBlur)

        return () => {
            window.removeEventListener('focus', handleFocus)
            window.removeEventListener('blur', handleBlur)
        }
    }, [])

    return null
}
