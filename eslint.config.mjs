import eslint from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import { defineConfig } from 'eslint/config';
import eslintNode from 'eslint-plugin-n';
import eslintReactPlugin from 'eslint-plugin-react';
import eslintReactPerf from 'eslint-plugin-react-perf';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  nextPlugin.configs.recommended,
  eslintPluginUnicorn.configs.recommended,
  eslintNode.configs['flat/recommended-module'],
  eslintReactPlugin.configs.flat.recommended,
  eslintReactPlugin.configs.flat['jsx-runtime'],
  eslintReactPerf.configs.flat.recommended,

  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        ecmaScriptFeatures: { jsx: true },
      },
    },
  },
  { ignores: ['.next'] },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'n/no-missing-import': 'off',
      'simple-import-sort/exports': 'warn',
      'simple-import-sort/imports': 'warn',
      'unicorn/filename-case': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
);
