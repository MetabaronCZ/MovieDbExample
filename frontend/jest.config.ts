import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.ts?(x)'],
  modulePaths: ['./src/scripts'],
  clearMocks: true,
  resetModules: true,
  setupFilesAfterEnv: ['<rootDir>/src/scripts/test-utils/setup.tsx'],
};

export default config;
