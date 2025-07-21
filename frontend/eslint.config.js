// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import vitestPlugin from 'eslint-plugin-vitest'
import testingLibrary from 'eslint-plugin-testing-library'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  // Add Vitest specific rules for test files
  {
    files: ['**/*.{test,spec}.{ts,tsx}'],
    ...vitestPlugin.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...vitestPlugin.environments.env.globals,
      },
    },
  },
  // Add Testing Library rules for test files
  {
    files: ['**/*.{test,spec}.{ts,tsx}'],
    plugins: {
      'testing-library': testingLibrary,
    },
    rules: {
      ...testingLibrary.configs.react.rules,
    },
  },
  // Add Prettier config last to override any conflicting rules
  prettierConfig,
], storybook.configs["flat/recommended"]);
