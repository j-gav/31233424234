import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],

  {
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        ...globals.node
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/attribute-hyphenation': 'off',
      'vue/require-default-prop': 'off',
      'vue/no-v-html': 'off',
      'vue/html-self-closing': 'off'
    },
  }
]
