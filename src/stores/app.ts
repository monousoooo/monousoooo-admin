export const useAppStore = defineStore('app', () => {
  const locale = ref<string>(lsLocaleState.value)
  const toggleLocale = (locale: string) => {
    lsLocaleState.value = locale
  }

  return {
    locale,
    toggleLocale,
  }
})
