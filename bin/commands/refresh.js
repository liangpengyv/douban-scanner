import { Command } from 'commander'
import axios from 'axios'

import $T from '../locales/index.js'
import { readUserId } from '../utils/index.js'
import { SERVER_MOUBAN_BASE_URL } from '../contants/index.js'

const refreshCommand = new Command('refresh')

refreshCommand
  .addHelpCommand(false)
  .helpOption('-h --help', $T('display help for command'))
  .description('强制更新缓存数据')

refreshCommand
  .command('user')
  .description('强制更新用户数据')
  .action(() => commandHandler('user'))

refreshCommand
  .command('book <res-id>')
  .description('强制刷新豆瓣读书指定资源')
  .action((resId) => commandHandler('book', resId))

refreshCommand
  .command('movie <res-id>')
  .description('强制刷新豆瓣电影指定资源')
  .action((resId) => commandHandler('movie', resId))

refreshCommand
  .command('music <res-id>')
  .description('强制刷新豆瓣音乐指定资源')
  .action((resId) => commandHandler('music', resId))

const commandHandler = (type, resId) => {
  if (type === 'user') {
    requestUser()
  } else {
    requestItem(type, resId)
  }
}

/**
 * 强制更新用户
 *
 * @returns 是否请求成功
 */
const requestUser = async () => {
  const url = computedUserUrl()
  if (!url) return

  try {
    const res = await axios.get(url)
    if (res.data?.success) {
      return res.data.success
    } else {
      console.log(`❗️ ${res.data?.msg ?? 'ERR_BAD_REQUEST'}`)
    }
  } catch (error) {
    console.log(`❗️ ${error.response.data ?? 'ERR_BAD_REQUEST'}`)
  }
}

/**
 * 更新用户的请求地址
 *
 * @returns
 */
const computedUserUrl = () => {
  const userId = readUserId()
  if (!userId) return

  return `${SERVER_MOUBAN_BASE_URL}/admin/refresh_user?id=${userId}`
}

/**
 * 强制更新条目
 *
 * @param {String} type
 * @param {String} resId
 * @returns 是否请求成功
 */
const requestItem = async (type, resId) => {
  const url = computedItemUrl(type, resId)
  if (!url) return

  try {
    const res = await axios.get(url)
    if (res.data?.success) {
      return res.data.success
    } else {
      console.log(`❗️ ${res.data?.msg ?? 'ERR_BAD_REQUEST'}`)
    }
  } catch (error) {
    console.log(`❗️ ${error.response.data ?? 'ERR_BAD_REQUEST'}`)
  }
}

/**
 * 更新条目的请求地址
 *
 * @param {String} type
 * @param {String} resId
 * @returns
 */
const computedItemUrl = (type, resId) => {
  const userId = readUserId()
  if (!userId) return

  const TYPE_PATH_DICT = {
    book: 1,
    movie: 2,
    music: 4
  }

  return `${SERVER_MOUBAN_BASE_URL}/admin/refresh_item?type=${TYPE_PATH_DICT[type]}&id=${resId}`
}

export { refreshCommand }
