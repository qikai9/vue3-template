module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base',
    'plugin:prettier/recommended' // 添加 prettier 插件,处理prettier和eslint的冲突问题，优先prettier规则
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    // 关闭名称校验
    'vue/multi-word-component-names': 'off',
    // 解决vite+airbnb导致eslint报错import/extensions
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-console': 'off',
    // 关闭，处理vue3中组件导入后不需要申明的情况
    'no-unused-vars': 'off'
  },
  settings: {
    // 处理 path resolve 的问题
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
}
