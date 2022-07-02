/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended"
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-empty': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    //'vue/no-use-v-if-with-v-for': 'off',
    'vue/no-unused-components': 'off',
    //'vue/no-mutating-props': 'off',
    //'@typescript-eslint/no-var-requires': 'off',
    "vue/multi-word-component-names": 'off',
  },
  env: {
    "vue/setup-compiler-macros": true
  },
};
