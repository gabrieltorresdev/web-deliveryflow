// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "nuxt-tiptap-editor",
  ],
  colorMode: {
    preference: "light",
  },
  css: ["~/assets/css/main.css"],
  tiptap: {
    prefix: "Tiptap",
  },
});
