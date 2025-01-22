// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],
  app: {
    baseURL: '/'  
  },
  nitro: {
    preset: 'cloudflare'
  },
  content: {
    // Content module configuration
    markdown: {
      // Remove the custom tags configuration as it was causing issues
      toc: {
        depth: 3,
        searchDepth: 3
      },
      // Instead, we'll use Tailwind's typography plugin for styling
      remarkPlugins: [],
      rehypePlugins: []
    }
  }
})