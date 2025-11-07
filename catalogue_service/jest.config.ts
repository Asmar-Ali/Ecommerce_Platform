/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coveragePathIgnorePatterns: ['/node_modules'],
  moduleDirectories: ['node_modules', 'src'],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/__test__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: {
          module: 'commonjs',
          isolatedModules: false
        },
        useESM: false
      }
    ]
  },
  extensionsToTreatAsEsm: []
};

export default config;
