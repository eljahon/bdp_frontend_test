import i18n from './utils/i18n'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'GreenAral',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.svg' },
      {
        rel: 'preload',
        as: 'style',
        onload: "this.onload=null;this.rel='stylesheet'",
        href: 'https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css',
      },
    ],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/clickOutside.client.js',
    '~/plugins/vueAwesomeSwiper.js',
    '~/plugins/other-libraries.js',
    '~/plugins/vue-gtag.js',
    '~/plugins/vue-js-modal.js',
    '~/plugins/axios.js',
    '~/plugins/vee-validate.js',
    '~/plugins/v-mask',
    { src: '~/plugins/client-libraries', mode: 'client' },
    '~/utils/bridge.js',
    '~/utils/tools.js',
    '~/utils/constants.js',
    // '~/plugins/all-consts.js',
    // '~/plugins/v-viewer.client.js',git
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/google-analytics',
    [
      'nuxt-i18n',
      {
        vueI18nLoader: true,
        defaultLocale: 'en',
        detectBrowserLanguage: false,
        seo: true,
        strategy: 'prefix',
        rootRedirect: 'en',
        locales: [
          {
            code: 'en',
            name: 'English',
            iso: 'en',
          },
          {
            code: 'ru',
            name: 'Русский',
            iso: 'ru',
          },
          {
            code: 'uz',
            name: 'O\'zbekcha',
            iso: 'uz',
          },
          {
            code: 'kl',
            name: 'Qoraqalpoq',
            iso: 'kl',
          },
        ],
        vueI18n: i18n,
      },
    ],
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/sentry',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    // '@nuxtjs/auth',
    // 'vue-currency-filter/nuxt',
  ],
  sentry: {
    dsn: "https://d958b94121cd4ff58d27e85e5fa7ce4b@o1335273.ingest.sentry.io/6620840", // Enter your project's DSN here
    // Additional Module Options go here
    // https://sentry.nuxtjs.org/sentry/options
    config: {
      // Add native Sentry config here
      // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/
    },
  },
  auth: {
    // localStorage: false,
    // cookie: {
    //   expires: 7
    // },
    strategies: {
      local: {
        token: {
          property: 'jwt',
          // maxAge: 30 * 24 * 60 * 60,
          // global: true,
          // type: 'Bearer'
        },
        user: {
          property: false,
        },
        endpoints: {
          login: { url: 'auth/local', method: 'post' },
          user: { url: 'users/me', method: 'get' },
          logout: false
        },
        redirect: {
          login: '/',
          logout: '/',
          user: '/profile',
          callback: '/'
        }
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  router: {
    middleware: ['auth'],
    prefetchLinks: false
  },

  googleFonts: {
    families: {
      Inter: [300, 400, 600, 700],
    },
    display: 'swap',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
  },
}
