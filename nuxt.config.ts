import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const pnpmDir = fileURLToPath(new URL('./node_modules/.pnpm', import.meta.url))
const vueDirName = readdirSync(pnpmDir).find(name => name.startsWith('vue@'))
const vuePath = fileURLToPath(new URL(`./node_modules/.pnpm/${vueDirName}/node_modules/vue`, import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    ['github:resaitsolutions/skilleate-dashboard-layer#v1.0.0', { install: true }]
  ],

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    experimental: {
      sqliteConnector: 'native'
    }
  },

  alias: {
    vue: vuePath
  },

  routeRules: {
    '/docs': { redirect: '/docs/getting-started', prerender: false },
    '/app/**': { prerender: false, ssr: true }
  },

  sourcemap: {
    server: false,
    client: false
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: false
    }
  },

  vite: {
    resolve: {
      dedupe: ['vue']
    },
    optimizeDeps: {
      include: ['@unovis/ts', '@unovis/vue', 'date-fns']
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  ogImage: {
    zeroRuntime: true
  }
})
