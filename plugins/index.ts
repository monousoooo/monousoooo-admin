import type { PluginOption } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

export function createVitePlugins() {
  const vitePluginList: (PluginOption | PluginOption[])[] = [
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/core',
        'pinia',
      ],
      dts: 'types/auto-imports.d.ts',
      dirs: ['src/stores', 'src/composables'],
    }),
  ]
  return vitePluginList
}
