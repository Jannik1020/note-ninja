const localeModules = import.meta.glob('./locales/*.json')

const I18nManager = {
  get supportedLocales() {
    return Object.keys(localeModules)
      .map((file) => file.match(/\.\/locales\/([^/]+)\.json$/)?.[1])
      .filter(Boolean)
  },
}

export default I18nManager
