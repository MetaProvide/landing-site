module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'plugin:@next/next/recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
};