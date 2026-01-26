import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import checkFile from 'eslint-plugin-check-file'
import importPlugin from 'eslint-plugin-import'

export default defineConfig([
    ...nextVitals,
    ...nextTs,
    globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
    {
        plugins: {
            import: importPlugin,
            'check-file': checkFile,
        },
        rules: {
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object',
                    ],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
            'import/no-restricted-paths': [
                'error',
                {
                    zones: [
                        // enforce unidirectional codebase:
                        // e.g. src/app can import from src/features but not the other way around
                        {
                            target: './src/features',
                            from: './src/app',
                        },
                        // e.g src/features and src/app can import from these shared modules but not the other way around
                        {
                            target: [
                                './src/components',
                                './src/hooks',
                                './src/lib',
                                './src/types',
                                './src/utils',
                            ],
                            from: ['./src/features', './src/app'],
                        },
                    ],
                },
            ],
            'check-file/filename-naming-convention': [
                'error',
                {
                    '**/*.{ts,tsx}': 'KEBAB_CASE',
                },
                {
                    ignoreMiddleExtensions: true,
                },
            ],
            'check-file/folder-naming-convention': [
                'error',
                {
                    'src/**/!(__tests__)': 'KEBAB_CASE',
                },
            ],
        },
    },
])
