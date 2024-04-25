const { Command } = require('commander')
const fs = require('fs')
const os = require('os')
const path = require('path')
const ini = require('ini')

const CONFIG_FILE_PATH = path.join(os.homedir(), '.dscanconfig')
const CONFIG_FILE_ENCODING = 'utf8'

const configCommand = new Command('config')

configCommand
  .arguments('[key] [value]')
  .description('设置或读取配置')
  .action((key, value) => commandHandler(key, value))

/**
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
 * 检查配置文件是否存在（若文件不存在，将创建该文件）
 *
 * @returns 最终是否存在配置文件
 */
const checkOrCreatConfigFile = () => {
  if (!fs.existsSync(CONFIG_FILE_PATH)) {
    try {
      fs.writeFileSync(CONFIG_FILE_PATH, '', CONFIG_FILE_ENCODING)
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  } else {
    return true
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
      console.log('尚未添加任何配置项！')
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * 读取 `<key>`
 *
 * @param {String} key
 */
const getConfig = (key) => {
  try {
    const dataStr = fs.readFileSync(CONFIG_FILE_PATH, CONFIG_FILE_ENCODING)
    const dataObj = ini.parse(dataStr)
    if (dataObj[key]) {
      console.log(dataObj[key])
    }
  } catch (error) {
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
  } catch (error) {
    console.log(error)
  }
}

module.exports = configCommand
