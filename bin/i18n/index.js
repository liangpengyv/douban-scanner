const zh = require('./zh.json')

const getCurrentLang = () => {
  return zh // temp
}

const $T = (key) => {
  return getCurrentLang()[key] ?? key
}

module.exports = $T
