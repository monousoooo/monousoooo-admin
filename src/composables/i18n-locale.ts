import dayjs from 'dayjs'
import { i18n } from '../locales'
import 'dayjs/locale/zh-cn'

const LOCALE_KEY = 'locale'

export const preferredLanguages = usePreferredLanguages()

export const lsLocaleState = useStorage(LOCALE_KEY, preferredLanguages.value[0])

export const useI18nLocale = createSharedComposable(() => {
  const locale = computed(() => {
    return unref(i18n.global.locale)
  })

  const antd = computed(() => {
    return (i18n.global.getLocaleMessage(unref(locale)) as any)?.antd || undefined
  })

  watch(locale, () => {
    dayjs.locale(antd.value.locale)
  })

  return {
    locale,
    antd,
  }
})
