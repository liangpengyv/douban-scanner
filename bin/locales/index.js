const i18n = require('i18n')

i18n.configure({
  locales: ['en', 'zh'],
  directory: __dirname
})

const lang = process.env.LANG?.substring(0, 2) || 'en'
i18n.setLocale(lang)

const $T = phrase => i18n.__(phrase)

module.exports = $T
