import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

const pinia = createPinia()

pinia.use(piniaPluginPersistedState)
pinia.use(({ store }) => {
  store.router = markRaw(router)
})

createApp(App).use(pinia).use(router).mount('#app')
