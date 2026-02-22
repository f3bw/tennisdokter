import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'

export interface HorizontalLoopConfig {
    repeat?: number
    paused?: boolean
    speed?: number
    snap?: number | false
    paddingRight?: number
    reversed?: boolean
    center?: boolean
    draggable?: boolean
    onChange?: (element: HTMLElement, index: number) => void
}

export interface HorizontalLoopTimeline extends gsap.core.Timeline {
    toIndex: (
        index: number,
        vars?: gsap.TweenVars
    ) => gsap.core.Tween | gsap.core.Timeline
    closestIndex: (setCurrent?: boolean) => number
    current: () => number
    next: (vars?: gsap.TweenVars) => gsap.core.Tween | gsap.core.Timeline
    previous: (vars?: gsap.TweenVars) => gsap.core.Tween | gsap.core.Timeline
    times: number[]
    draggable?: Draggable
    refresh: (deep?: boolean) => void
}

export function horizontalLoop(
    items: HTMLElement[],
    config: HorizontalLoopConfig = {}
): HorizontalLoopTimeline {
    const onChange = config.onChange
    let lastIndex = 0

    const tl = gsap.timeline({
        repeat: config.repeat,
        onUpdate:
            onChange &&
            function () {
                const i = (tl as HorizontalLoopTimeline).closestIndex()
                if (lastIndex !== i) {
                    lastIndex = i
                    onChange(items[i]!, i)
                }
            },
        paused: config.paused,
        defaults: { ease: 'none' },
        onReverseComplete: () => {
            tl.totalTime(tl.rawTime() + tl.duration() * 100)
        },
    }) as HorizontalLoopTimeline

    const length = items.length
    const startX = items[0]!.offsetLeft
    const times: number[] = []
    const widths: number[] = []
    const spaceBefore: number[] = []
    const xPercents: number[] = []
    let curIndex = 0
    let indexIsDirty = false
    const center = config.center
    const pixelsPerSecond = (config.speed ?? 1) * 100
    const snap =
        config.snap === false
            ? (v: number) => v
            : gsap.utils.snap(config.snap ?? 1)
    let timeOffset = 0
    const container = items[0]!.parentNode as HTMLElement
    let totalWidth = 0
    let timeWrap: (value: number) => number

    const getTotalWidth = () =>
        items[length - 1]!.offsetLeft +
        (xPercents[length - 1]! / 100) * widths[length - 1]! -
        startX +
        (spaceBefore[0] ?? 0) +
        items[length - 1]!.offsetWidth *
            (gsap.getProperty(items[length - 1]!, 'scaleX') as number) +
        (parseFloat(String(config.paddingRight)) || 0)

    const populateWidths = () => {
        let b1 = container.getBoundingClientRect()
        items.forEach((el, i) => {
            widths[i] = parseFloat(
                gsap.getProperty(el, 'width', 'px') as string
            )
            xPercents[i] = snap(
                (parseFloat(gsap.getProperty(el, 'x', 'px') as string) /
                    widths[i]!) *
                    100 +
                    (gsap.getProperty(el, 'xPercent') as number)
            )
            const b2 = el.getBoundingClientRect()
            spaceBefore[i] = b2.left - (i ? b1.right : b1.left)
            b1 = b2
        })
        gsap.set(items, { xPercent: (i) => xPercents[i]! })
        totalWidth = getTotalWidth()
    }

    const populateOffsets = () => {
        timeOffset = center
            ? (tl.duration() * (container.offsetWidth / 2)) / totalWidth
            : 0
        if (center) {
            times.forEach((t, i) => {
                times[i] = timeWrap(
                    tl.labels[`label${i}`]! +
                        (tl.duration() * widths[i]!) / 2 / totalWidth -
                        timeOffset
                )
            })
        }
    }

    const getClosest = (values: number[], value: number, wrap: number) => {
        let i = values.length
        let closest = 1e10
        let index = 0
        while (i--) {
            let d = Math.abs(values[i]! - value)
            if (d > wrap / 2) d = wrap - d
            if (d < closest) {
                closest = d
                index = i
            }
        }
        return index
    }

    const populateTimeline = () => {
        tl.clear()
        for (let i = 0; i < length; i++) {
            const item = items[i]!
            const curX = (xPercents[i]! / 100) * widths[i]!
            const distanceToStart =
                item.offsetLeft + curX - startX + (spaceBefore[0] ?? 0)
            const distanceToLoop =
                distanceToStart +
                widths[i]! * (gsap.getProperty(item, 'scaleX') as number)
            tl.to(
                item,
                {
                    xPercent: snap(
                        ((curX - distanceToLoop) / widths[i]!) * 100
                    ),
                    duration: distanceToLoop / pixelsPerSecond,
                },
                0
            )
                .fromTo(
                    item,
                    {
                        xPercent: snap(
                            ((curX - distanceToLoop + totalWidth) /
                                widths[i]!) *
                                100
                        ),
                    },
                    {
                        xPercent: xPercents[i]!,
                        duration:
                            (curX - distanceToLoop + totalWidth - curX) /
                            pixelsPerSecond,
                        immediateRender: false,
                    },
                    distanceToLoop / pixelsPerSecond
                )
                .add(`label${i}`, distanceToStart / pixelsPerSecond)
            times[i] = distanceToStart / pixelsPerSecond
        }
        timeWrap = gsap.utils.wrap(0, tl.duration())
    }

    let proxy: HTMLElement

    const refresh = (deep?: boolean) => {
        const progress = tl.progress()
        tl.progress(0, true)
        populateWidths()
        if (deep) populateTimeline()
        populateOffsets()
        if (deep && tl.draggable) {
            tl.time(times[curIndex]!, true)
        } else {
            tl.progress(progress, true)
        }
    }

    gsap.set(items, { x: 0 })
    populateWidths()
    populateTimeline()
    populateOffsets()

    const toIndex = (index: number, vars: gsap.TweenVars = {}) => {
        if (Math.abs(index - curIndex) > length / 2) {
            index += index > curIndex ? -length : length
        }
        const newIndex = gsap.utils.wrap(0, length, index)
        let time = times[newIndex]!
        if (time > tl.time() !== index > curIndex && index !== curIndex) {
            time += tl.duration() * (index > curIndex ? 1 : -1)
        }
        if (time < 0 || time > tl.duration()) {
            vars = { ...vars, modifiers: { time: timeWrap } }
        }
        curIndex = newIndex
        vars.overwrite = true
        if (proxy) gsap.killTweensOf(proxy)
        return vars.duration === 0
            ? tl.time(timeWrap(time))
            : tl.tweenTo(time, vars)
    }

    tl.toIndex = (index, vars) => toIndex(index, vars)
    tl.closestIndex = (setCurrent) => {
        const index = getClosest(times, tl.time(), tl.duration())
        if (setCurrent) {
            curIndex = index
            indexIsDirty = false
        }
        return index
    }
    tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex)
    tl.next = (vars) => toIndex(tl.current() + 1, vars)
    tl.previous = (vars) => toIndex(tl.current() - 1, vars)
    tl.times = times
    tl.refresh = refresh

    tl.progress(1, true).progress(0, true)

    if (config.reversed) {
        tl.vars.onReverseComplete?.call(tl)
        tl.reverse()
    }

    if (config.draggable && typeof Draggable === 'function') {
        proxy = document.createElement('div')
        let startProgress: number
        let lastSnap: number
        let initChangeX: number
        let wasPlaying: boolean

        const align = () => {
            tl.progress(
                gsap.utils.wrap(
                    0,
                    1,
                    startProgress +
                        (tl.draggable!.startX - tl.draggable!.x) / totalWidth
                )
            )
        }
        const syncIndex = () => tl.closestIndex(true)

        const [draggable] = Draggable.create(proxy, {
            trigger: items[0]!.parentNode as HTMLElement,
            type: 'x',
            onPressInit() {
                const x = (this as Draggable).x
                gsap.killTweensOf(tl)
                wasPlaying = !tl.paused()
                tl.pause()
                startProgress = tl.progress()
                refresh()
                initChangeX = startProgress / -(1 / totalWidth) - x
                gsap.set(proxy, { x: startProgress / -(1 / totalWidth) })
            },
            onDrag: align,
            onThrowUpdate: align,
            overshootTolerance: 0,
            inertia: true,
            snap(value: number) {
                if (
                    Math.abs(
                        startProgress / -(1 / totalWidth) -
                            (this as Draggable).x
                    ) < 10
                ) {
                    return lastSnap + initChangeX
                }
                const time = -(value / totalWidth) * tl.duration()
                const wrappedTime = timeWrap(time)
                const snapTime =
                    times[getClosest(times, wrappedTime, tl.duration())]!
                let dif = snapTime - wrappedTime
                if (Math.abs(dif) > tl.duration() / 2) {
                    dif += dif < 0 ? tl.duration() : -tl.duration()
                }
                lastSnap = (time + dif) / tl.duration() / -(1 / totalWidth)
                return lastSnap
            },
            onRelease() {
                syncIndex()
                if ((this as Draggable).isThrowing) indexIsDirty = true
            },
            onThrowComplete: () => {
                syncIndex()
                if (wasPlaying) tl.play()
            },
        })
        tl.draggable = draggable
    }

    tl.closestIndex(true)
    lastIndex = curIndex
    if (onChange) onChange(items[curIndex]!, curIndex)

    return tl
}
