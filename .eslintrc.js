module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json'
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // Redux Toolkit works with Immer.js so it tracks state mutations via =
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    'linebreak-style': ["error", (process.platform === "win32" ? "windows" : "unix")],
    'no-console': 'off',
    'no-alert': 'off',
  }
}