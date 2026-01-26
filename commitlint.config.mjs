const config = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            ['fix', 'feat', 'chore', 'docs', 'style', 'revert'],
        ],
        // Disabled for PR 'references-empty': [2, 'never'],
    },
    parserPreset: {
        parserOpts: {
            issuePrefixes: ['XXXXX-'],
        },
    },
}

export default config
