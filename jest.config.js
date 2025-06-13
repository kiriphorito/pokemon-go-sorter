/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules'],
  testMatch: ['<rootDir>/src/**/*.spec.ts', '<rootDir>/data/**/*.spec.ts'],
  coveragePathIgnorePatterns: ['<rootDir>/src/test']
};