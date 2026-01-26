import { useCallback, useState } from 'react'

export function useControlledState<T>(
    externalValue: T | undefined,
    onChange?: (value: T) => void,
    defaultValue?: T
): [T, (newValue: T) => void] {
    const isControlled = externalValue !== undefined
    const [internalValue, setInternalValue] = useState<T>(
        defaultValue !== undefined ? defaultValue : (externalValue as T)
    )

    const value = isControlled ? (externalValue as T) : internalValue

    const setValue = useCallback(
        (newValue: T) => {
            if (!isControlled) {
                setInternalValue(newValue)
            }
            onChange?.(newValue)
        },
        [isControlled, onChange]
    )

    return [value, setValue]
}
