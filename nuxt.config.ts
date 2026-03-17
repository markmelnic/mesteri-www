export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/i18n'],

  ui: {
    colorMode: false
  },

  srcDir: 'app/',

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  i18n: {
    locales: [
      { code: 'ro', name: 'Română', file: 'ro.json' },
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'ru', name: 'Русский', file: 'ru.json' }
    ],
    defaultLocale: 'ro',
    langDir: '../i18n/locales/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  icon: {
    collections: ['heroicons', 'lucide']
  },

  compatibilityDate: '2025-01-01'
})
