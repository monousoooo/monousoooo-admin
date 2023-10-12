import { createApp } from 'vue'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'
import { setupI18n } from './locales'

const pinia = createPinia()

async function bootstrap() {
  const app = createApp(App)
  app.use(pinia)
  await setupI18n(app)
  app.mount('#app')
}
bootstrap()
