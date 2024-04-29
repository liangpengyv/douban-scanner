import i18n from 'i18n'

i18n.configure({
  locales: ['en', 'zh'],
  directory: import.meta.dirname
})

const lang = process.env.LANG?.substring(0, 2) || 'en'
i18n.setLocale(lang)

const $T = phrase => i18n.__(phrase)

export default $T
