export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/i18n'],

  ui: {
    colorMode: false
  },

  srcDir: 'app/',

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'mesteri.md — Găsește meșterul potrivit',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Găsește meșteri verificați pentru orice lucrare: instalații, renovări, curățenie și multe altele. Platforma serviciilor din Moldova.' },
        { name: 'theme-color', content: '#FFFFFF' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'mesteri.md — Găsește meșterul potrivit' },
        { property: 'og:description', content: 'Meșteri verificați, oferte transparente, recenzii reale. Platforma serviciilor din Moldova.' },
        { property: 'og:image', content: '/og-image.png' },
        { property: 'og:site_name', content: 'mesteri.md' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'mesteri.md — Găsește meșterul potrivit' },
        { name: 'twitter:description', content: 'Meșteri verificați, oferte transparente, recenzii reale.' },
        { name: 'twitter:image', content: '/og-image.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&display=swap' }
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
