import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type RefObject, useEffect } from 'react'

import { horizontalLoop } from '@/utils/horizontal-loop'

gsap.registerPlugin(CustomEase, ScrollTrigger, Draggable, InertiaPlugin)
CustomEase.create('osmo-ease', '0.625, 0.05, 0, 1')

export const useCenteredSlider = (
    containerRef: RefObject<HTMLElement | null>
) => {
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const ctx = gsap.context(() => {
            const cleanups: Array<() => void> = []

            container
                .querySelectorAll<HTMLElement>(
                    '[data-centered-slider="wrapper"]'
                )
                .forEach((sliderWrapper) => {
                    const slides = gsap.utils.toArray<HTMLElement>(
                        sliderWrapper.querySelectorAll(
                            '[data-centered-slider="slide"]'
                        )
                    )
                    const bullets = gsap.utils.toArray<HTMLElement>(
                        sliderWrapper.querySelectorAll(
                            '[data-centered-slider="bullet"]'
                        )
                    )
                    const prevButton = sliderWrapper.querySelector<HTMLElement>(
                        '[data-centered-slider="prev-button"]'
                    )
                    const nextButton = sliderWrapper.querySelector<HTMLElement>(
                        '[data-centered-slider="next-button"]'
                    )

                    let activeSlide: HTMLElement | undefined
                    let activeBullet: HTMLElement | undefined
                    let currentIndex = 0
                    let autoplay: gsap.core.Tween | null = null
                    let elapsedAtPause = 0

                    const autoplayEnabled =
                        sliderWrapper.dataset.sliderAutoplay === 'true'
                    const autoplayDuration = autoplayEnabled
                        ? parseFloat(
                              sliderWrapper.dataset.sliderAutoplayDuration ??
                                  '0'
                          ) || 0
                        : 0

                    slides.forEach((slide, i) => {
                        slide.setAttribute('id', `slide-${i}`)
                    })
                    if (bullets.length > 0) {
                        bullets.forEach((bullet, i) => {
                            bullet.setAttribute('aria-controls', `slide-${i}`)
                            bullet.setAttribute(
                                'aria-selected',
                                i === currentIndex ? 'true' : 'false'
                            )
                        })
                    }

                    const loop = horizontalLoop(slides, {
                        paused: true,
                        draggable: true,
                        center: true,
                        onChange: (element: HTMLElement, index: number) => {
                            currentIndex = index

                            if (activeSlide)
                                activeSlide.removeAttribute(
                                    'data-slider-active'
                                )
                            element.setAttribute('data-slider-active', '')
                            activeSlide = element

                            if (bullets.length > 0) {
                                if (activeBullet)
                                    activeBullet.removeAttribute(
                                        'data-slider-active'
                                    )
                                if (bullets[index]) {
                                    bullets[index]!.setAttribute(
                                        'data-slider-active',
                                        ''
                                    )
                                    activeBullet = bullets[index]
                                }
                                bullets.forEach((bullet, i) => {
                                    bullet.setAttribute(
                                        'aria-selected',
                                        i === index ? 'true' : 'false'
                                    )
                                })
                            }
                        },
                    })

                    loop.toIndex(2, { duration: 0.01 })

                    const startAutoplay = () => {
                        if (autoplayDuration > 0 && !autoplay) {
                            // Reset ring animation so it syncs with the new timer
                            if (activeBullet) {
                                activeBullet.removeAttribute('data-slider-active')
                                void activeBullet.offsetWidth
                                activeBullet.setAttribute('data-slider-active', '')
                            }
                            elapsedAtPause = 0
                            const repeat = () => {
                                loop.next({
                                    ease: 'osmo-ease',
                                    duration: 0.725,
                                })
                                elapsedAtPause = 0
                                autoplay = gsap.delayedCall(
                                    autoplayDuration,
                                    repeat
                                )
                            }
                            autoplay = gsap.delayedCall(
                                autoplayDuration,
                                repeat
                            )
                        }
                    }

                    const resumeAutoplay = () => {
                        if (autoplayDuration > 0 && !autoplay) {
                            const remaining = Math.max(0, autoplayDuration - elapsedAtPause)
                            const repeat = () => {
                                loop.next({
                                    ease: 'osmo-ease',
                                    duration: 0.725,
                                })
                                elapsedAtPause = 0
                                autoplay = gsap.delayedCall(
                                    autoplayDuration,
                                    repeat
                                )
                            }
                            autoplay = gsap.delayedCall(remaining, repeat)
                        }
                    }

                    const stopAutoplay = () => {
                        if (autoplay) {
                            elapsedAtPause = autoplay.time()
                            autoplay.kill()
                            autoplay = null
                        }
                    }

                    ScrollTrigger.create({
                        trigger: sliderWrapper,
                        start: 'top bottom',
                        end: 'bottom top',
                        onEnter: startAutoplay,
                        onLeave: stopAutoplay,
                        onEnterBack: startAutoplay,
                        onLeaveBack: stopAutoplay,
                    })

                    const mouseEnterHandler = () => stopAutoplay()
                    const mouseLeaveHandler = () => {
                        if (ScrollTrigger.isInViewport(sliderWrapper))
                            resumeAutoplay()
                    }
                    sliderWrapper.addEventListener(
                        'mouseenter',
                        mouseEnterHandler
                    )
                    sliderWrapper.addEventListener(
                        'mouseleave',
                        mouseLeaveHandler
                    )
                    cleanups.push(() => {
                        sliderWrapper.removeEventListener(
                            'mouseenter',
                            mouseEnterHandler
                        )
                        sliderWrapper.removeEventListener(
                            'mouseleave',
                            mouseLeaveHandler
                        )
                    })

                    slides.forEach((slide, i) => {
                        const handler = () => {
                            loop.toIndex(i, {
                                ease: 'osmo-ease',
                                duration: 0.725,
                            })
                        }
                        slide.addEventListener('click', handler)
                        cleanups.push(() =>
                            slide.removeEventListener('click', handler)
                        )
                    })

                    bullets.forEach((bullet, i) => {
                        const handler = () => {
                            loop.toIndex(i, {
                                ease: 'osmo-ease',
                                duration: 0.725,
                            })
                        }
                        bullet.addEventListener('click', handler)
                        cleanups.push(() =>
                            bullet.removeEventListener('click', handler)
                        )
                    })

                    if (prevButton) {
                        const handler = () => {
                            const newIndex =
                                currentIndex - 1 < 0
                                    ? slides.length - 1
                                    : currentIndex - 1
                            loop.toIndex(newIndex, {
                                ease: 'osmo-ease',
                                duration: 0.725,
                            })
                        }
                        prevButton.addEventListener('click', handler)
                        cleanups.push(() =>
                            prevButton.removeEventListener('click', handler)
                        )
                    }

                    if (nextButton) {
                        const handler = () => {
                            const newIndex =
                                currentIndex + 1 >= slides.length
                                    ? 0
                                    : currentIndex + 1
                            loop.toIndex(newIndex, {
                                ease: 'osmo-ease',
                                duration: 0.725,
                            })
                        }
                        nextButton.addEventListener('click', handler)
                        cleanups.push(() =>
                            nextButton.removeEventListener('click', handler)
                        )
                    }

                    const onResize = () => loop.refresh(true)
                    window.addEventListener('resize', onResize)
                    cleanups.push(() =>
                        window.removeEventListener('resize', onResize)
                    )
                })

            return () => cleanups.forEach((fn) => fn())
        }, container)

        return () => ctx.revert()
        // containerRef is stable — intentionally omit from deps
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
