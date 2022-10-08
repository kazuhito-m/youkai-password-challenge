import colors from 'vuetify/es5/util/colors'

import {ProvidePlugin} from 'webpack';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Youkai Password Challenge',
    title: 'Youkai Password Challenge' || '',
    selfVersion: process.env.npm_package_version,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/markdownit',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/google-gtag',
    '@nuxt/content',
    '@nuxtjs/google-adsense',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.NODE_ENV === "production" ? "https://youkaiosugi.com/" : "http://localhost:8080/",
    // prefix: '/api',  // FIXME なぜか「効かない」ので使わない
    debug: process.env.NODE_ENV !== "production",
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ja'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  markdownit: {
    injected: true, // $md.render()がグローバルで使えるようになる
    preset: 'default',
    linkify: true,
    breaks: true  
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      new ProvidePlugin({
        '$': 'jquery',
        'jquery': 'jquery',
        'window.jQuery': 'jquery',
        'jQuery': 'jquery'
      })
    ],
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          test: /\.worker\.js$/,
          loader: 'worker-loader',
        })
      }
      // config.devtool = 'source-map'
      config.optimization.minimize = false; // クラス名を利用しているところが動かなくなるので
    }
  },
  loading: '~/components/Loading.vue',
  srcDir: 'src/',

  router: {
    base: '/'
  },

  'google-gtag': {
    id: 'G-SSP93CH50C',
  },
  'google-adsense': {
    id: 'ca-pub-5057344970486670',
    pageLevelAds: false
  }
}
