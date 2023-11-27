import { createApp } from 'vue'
import 'ant-design-vue/dist/reset.css'
import 'uno.css'
import App from './App.vue'
import { setupI18n } from './locales'
import router from './router'

const pinia = createPinia()

async function bootstrap() {
  const app = createApp(App)
  app.use(pinia)
  app.use(router)
  await setupI18n(app)
  app.mount('#app')
}
bootstrap()
