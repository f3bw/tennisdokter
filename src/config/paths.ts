export const paths = {
    home: {
        getHref: () => '/',
    },
    account: {
        register: {
            getHref: (redirectTo?: string | null) =>
                `/account/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
        },
        login: {
            getHref: (redirectTo?: string | null) =>
                `/account/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
        },
    },
} as const
