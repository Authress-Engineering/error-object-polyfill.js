import authressConfig from '@authress/eslint-config';

export default [
  { ignores: ['node_modules/'] },
  ...authressConfig,
  {
    files: ['index.js'],
    rules: {
      'no-extend-native': 'off'
    }
  },
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        ApplicationError: 'readonly'
      }
    }
  }
];
