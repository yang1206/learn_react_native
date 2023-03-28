module.exports = {
  extends: [
    '@antfu/eslint-config-react',
  ],
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks', 'react', 'react-native'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
  rules: {
    'semi': ['error', 'never'], // 去掉代码末尾的分号
    // 'quotes': ['error', 'single'], // 使用单引号
    'no-console': 'warn', // console 报警
    'react-native/no-inline-styles': 'warn', // 报警内联样式
    'no-use-before-define': 'on',
    '@typescript-eslint/no-use-before-define': 'warn',
  },
}
