import type { App } from 'vue'
import type { I18n, I18nOptions } from 'vue-i18n'
import { createI18n } from 'vue-i18n'

// eslint-disable-next-line import/no-mutable-exports
export let i18n: I18n

async function createI18nOptions(): Promise<I18nOptions> {
  const appStore = useAppStore()
  const { locale } = storeToRefs(appStore)
  const defaultLocal = await import(`./lang/${locale.value}.ts`)
  return {
    legacy: false,
    locale: locale.value,
    fallbackLocale: 'zh-CN',
    messages: {
      [locale.value]: defaultLocal.default,
    },
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
  }
}

export async function setupI18n(app: App) {
  const options = await createI18nOptions()
  i18n = createI18n(options)
  app.use(i18n)
}
