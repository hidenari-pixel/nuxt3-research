import { defineNuxtPlugin } from 'nuxt/app'
import ElementPlus from "element-plus"
import { ID_INJECTION_KEY } from 'element-plus'
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(ID_INJECTION_KEY, {
    prefix: Math.floor(Math.random() * 10000),
    current: 0,
  }).use(ElementPlus)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    nuxtApp.vueApp.component(key, component)
  }
})
