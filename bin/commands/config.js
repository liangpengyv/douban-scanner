const { Command } = require('commander')
const fs = require('fs')
const ini = require('ini')

const { checkOrCreatConfigFile } = require('../utils')
const {
  CONFIG_FILE_PATH,
  CONFIG_FILE_ENCODING,
  CONFIG_FILE_SUPPORTED_KEYS
} = require('../contants')

const configCommand = new Command('config')

configCommand
  .arguments('[key] [value]')
  .description('设置或读取配置')
  .action((key, value) => commandHandler(key, value))

/**
 * command 处理器
 *
 * @param {String} key
 * @param {String} value
 * @returns
 */
const commandHandler = (key, value) => {
  if (!checkOrCreatConfigFile()) return

  switch (true) {
    case !key && !value:
      getAllConfig()
      break
    case !!key && !value:
      getConfig(key)
      break
    case !!key && !!value:
      setConfig(key, value)
      break
  }
}

/**
 * 读取所有配置
 */
const getAllConfig = () => {
  try {
    const dataStr = fs.readFileSync(CONFIG_FILE_PATH, CONFIG_FILE_ENCODING)
    const dataObj = ini.parse(dataStr)
    const newDataStr = ini.stringify(dataObj)
    if (newDataStr.trim()) {
      console.log(newDataStr.trim())
    } else {
      console.log('❗️ 尚未添加任何配置项！')
    }
  } catch (error) {
    console.log('❗️ 用户配置读取失败')
    console.log(error)
  }
}

/**
 * 读取 `<key>`
 *
 * @param {String} key
 */
const getConfig = (key) => {
  if (!Object.values(CONFIG_FILE_SUPPORTED_KEYS).includes(key)) {
    console.log(`❗️ \`${key}\` 不支持的配置项\n目前仅支持：\n  ${Object.values(CONFIG_FILE_SUPPORTED_KEYS).join('\n  ')}`)
    return
  }
  try {
    const dataStr = fs.readFileSync(CONFIG_FILE_PATH, CONFIG_FILE_ENCODING)
    const dataObj = ini.parse(dataStr)
    if (dataObj[key]) {
      console.log(dataObj[key])
    }
  } catch (error) {
    console.log('❗️ 用户配置读取失败')
    console.log(error)
  }
}

/**
 * 设置 `<key>=<value>`
 *
 * @param {String} key
 * @param {String} value
 */
const setConfig = (key, value) => {
  try {
    const dataStr = fs.readFileSync(CONFIG_FILE_PATH, CONFIG_FILE_ENCODING)
    const dataObj = ini.parse(dataStr)
    dataObj[key] = value
    const newDataStr = ini.stringify(dataObj)
    fs.writeFileSync(CONFIG_FILE_PATH, newDataStr, CONFIG_FILE_ENCODING)
    console.log('✅ 用户配置设置成功')
    console.log(`${key}=${value}`)
  } catch (error) {
    console.log('❗️ 用户配置设置失败')
    console.log(error)
  }
}

module.exports = configCommand
