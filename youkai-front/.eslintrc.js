module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  plugins: [
  ],
  ignorePatterns: [
    "doc/",
    "src/pages/canvastest.vue",
    "src/pages/layouttest.vue"
  ],
  // add your custom rules here
  rules: {
    "no-useless-constructor": "off",
    "no-console": "off",
    "vue/attribute-hyphenation": "off",
    "vue/multi-word-component-names": [
      'error',
      {
        "ignores": [ "Index", "doc" ]
      },
    ],
    "import/no-webpack-loader-syntax": "off"
  }
}
