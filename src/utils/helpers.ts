/**
 * Optional is a utility type to make one key from a type optional
 * Usage: type CustomerName = Optional<CustomerFullName, 'prefix'>
 */
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

/**
 * WithRequired is a utility type to make one key from a type required
 * Usage: type CustomerName = WithRequired<CustomerFullName, 'name'>
 */
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

/**
 * RequireAtLeastOne is a utility type to make one key from a type required
 * Usage: type ContactNumber = WithRequired<Customer, 'mobileNumber' | 'landlineNumber'>
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
    T,
    Exclude<keyof T, Keys>
> &
    {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]
