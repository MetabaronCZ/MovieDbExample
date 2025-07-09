// @ts-check
import globals from 'globals';
import eslint from '@eslint/js';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import storybook from 'eslint-plugin-storybook';
import reactHooks from 'eslint-plugin-react-hooks';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  // ignores
  {
    ignores: [
      'node_modules',
      'build',
      'coverage',
      '.storybook',
      'eslint.config.mjs',
    ],
  },

  // base rules
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,

  // Typescript config
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // JS / Typescript shared rules
  {
    rules: {
      'no-console': 'error',
      'no-control-regex': 'off',
    },
  },

  // Typescript-only rules
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-base-to-string': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends' },
      ],
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        { ignoreConditionalTests: true },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true },
      ],
      '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none' }],
    },
  },

  // React components rules
  {
    files: ['**/*.tsx'],
    plugins: {
      react,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'react/jsx-key': 'error',
      'react/prop-types': 'off',
      'react/display-name': 'off',
    },
  },

  // React hooks rules
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },

  // JS-only rules
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },

  // Prettier
  eslintPluginPrettierRecommended,

  // Storybook
  storybook.configs['flat/recommended'],
);
