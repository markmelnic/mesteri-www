export default defineNuxtConfig({
  modules: ['@nuxt/ui'],

  srcDir: 'app/',

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'mesteri.md — Găsește meșterul perfect pentru casa ta',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Conectăm proprietarii de case cu cei mai buni meșteri și companii de servicii din Moldova' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  fonts: {
    families: [
      { name: 'Plus Jakarta Sans', provider: 'google', weights: [500, 600, 700] },
      { name: 'DM Sans', provider: 'google', weights: [400, 500] }
    ]
  },

  icon: {
    collections: ['heroicons', 'lucide']
  },

  compatibilityDate: '2025-01-01'
})
