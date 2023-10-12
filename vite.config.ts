import { defineConfig } from 'vite'
import { createVitePlugins } from './plugins'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: createVitePlugins(),
})
