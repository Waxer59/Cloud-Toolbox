module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard-with-typescript', 'prettier'],
  overrides: [],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  },
  ignorePatterns: ['vite.config.ts'],
  plugins: ['react', 'prettier'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'no-useless-escape': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
