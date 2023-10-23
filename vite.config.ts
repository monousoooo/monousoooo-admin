import { resolve } from 'node:path'
import * as process from 'node:process'
import { loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import { createVitePlugins } from './plugins'

// https://vitejs.dev/config/
export default (): UserConfig => {
  return {
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src'),
        },
      ],
    },
    plugins: createVitePlugins(),
  }
}
