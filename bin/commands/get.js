const { Command } = require('commander')
const axios = require('axios').default
const fs = require('fs')
const ini = require('ini')
const copyPaste = require('copy-paste')

const $T = require('../locales')
const { checkOrCreatConfigFile } = require('../utils')
const {
  CONFIG_FILE_PATH,
  CONFIG_FILE_ENCODING,
  CONFIG_FILE_SUPPORTED_KEYS,
  SERVER_MOUBAN_BASE_URL
} = require('../contants')

const OPTION_TYPE_OPTIONS = ['wish', 'do', 'collect']
const OPTION_TYPE_DESCRIPTION = `资源类型 \`${OPTION_TYPE_OPTIONS.join('/')}\``

const getCommand = new Command('get')

getCommand
  .addHelpCommand(false)
  .helpOption('-h --help', $T('display help for command'))
  .description('获取用户的豆瓣书/影/音资源')

getCommand
  .command('book')
  .option('--type <value>', OPTION_TYPE_DESCRIPTION)
  .description('获取用户的豆瓣读书资源')
  .action(({ type }) => commandHandler('book', type))

getCommand
  .command('movie')
  .option('--type <value>', OPTION_TYPE_DESCRIPTION)
  .description('获取用户的豆瓣电影资源')
  .action(({ type }) => commandHandler('movie', type))

getCommand
  .command('music')
  .option('--type <value>', OPTION_TYPE_DESCRIPTION)
  .description('获取用户的豆瓣音乐资源')
  .action(({ type }) => commandHandler('music', type))

/**
 * command 处理器
 *
 * @param {String} category
 * @param {String} type
 * @returns
 */
const commandHandler = async (category, type) => {
  if (!type) {
    const data = {}
    for (const type of OPTION_TYPE_OPTIONS) {
      const result = await request(category, type)
      if (!result) return
      data[type] = result.comment
    }
    handleCopyToClipboard(JSON.stringify(data))
    return
  }

  if (!OPTION_TYPE_OPTIONS.includes(type)) {
    console.log(`❗️ 非法的类型，仅支持 \`${OPTION_TYPE_OPTIONS.join('/')}\` 几种类型`)
    return
  }

  const data = {}
  const result = await request(category, type)
  if (!result) return
  data[type] = result.comment
  handleCopyToClipboard(JSON.stringify(data))
}

/**
 * 将最终数据拷贝到系统剪贴板
 *
 * @param {String} dataStr
 */
const handleCopyToClipboard = (dataStr) => {
  copyPaste.copy(dataStr, (error) => {
    if (error) {
      console.log('❗️ 数据拷贝到系统剪贴板失败')
      console.log(error)
    } else {
      console.log('✅ 数据已经拷贝到系统剪贴板')
    }
  })
}

/**
 * 向数据服务端发送请求
 *
 * @param {String} category
 * @param {String} type
 * @returns
 */
const request = async (category, type) => {
  const url = computedUrl(category, type)
  if (!url) return

  try {
    const res = await axios.get(url)
    if (res.data?.success) {
      return res.data.result
    } else {
      console.log(`❗️ ${res.data?.msg ?? 'ERR_BAD_REQUEST'}`)
    }
  } catch (error) {
    console.log(`❗️ ${error.response.data ?? 'ERR_BAD_REQUEST'}`)
  }
}

/**
 * 计算目标的请求地址
 *
 * @param {String} category
 * @param {String} type
 * @returns
 */
const computedUrl = (category, type) => {
  if (!checkOrCreatConfigFile()) return

  const CATEGORY_PATH_DICT = {
    book: 'user_book',
    movie: 'user_movie',
    music: 'user_song'
  }

  try {
    const dataStr = fs.readFileSync(CONFIG_FILE_PATH, CONFIG_FILE_ENCODING)
    const dataObj = ini.parse(dataStr)
    const userId = dataObj[CONFIG_FILE_SUPPORTED_KEYS.userId]
    if (userId) {
      return `${SERVER_MOUBAN_BASE_URL}/guest/${CATEGORY_PATH_DICT[category]}?id=${userId}&action=${type}`
    } else {
      console.log('❗️ 尚未设置豆瓣用户信息!\n请执行 `dscan config user-id xxxxx`，以设置用户信息\nuser-id 来自 key 为 dbcl2 的 cookie 值中')
    }
  } catch (error) {
    console.log('❗️ 后端服务地址构建失败，请联系软件开发人员')
    console.log(error)
  }
}

module.exports = getCommand
