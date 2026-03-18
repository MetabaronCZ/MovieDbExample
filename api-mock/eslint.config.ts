// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig(
  // ignores
  {
    ignores: ['node_modules'],
  },

  // base rules
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,

  // Typescript config
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
      },
    },
  },

  // JS / Typescript shared rules
  {
    rules: {
      'no-control-regex': 'off',
    },
  },

  // Typescript-only rules
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        { ignoreConditionalTests: true },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true },
      ],
    },
  },

  // JS-only rules
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },

  // Prettier
  eslintPluginPrettierRecommended,
);
