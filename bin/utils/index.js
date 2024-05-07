import fs from 'node:fs'
import ini from 'ini'

import {
  CONFIG_FILE_PATH,
  CONFIG_FILE_ENCODING,
  CONFIG_FILE_SUPPORTED_KEYS
} from '../contants/index.js'

/**
 * 检查配置文件是否存在（若文件不存在，将创建该文件）
 *
 * @returns 最终是否存在配置文件
 */
export const checkOrCreatConfigFile = () => {
  try {
    if (!fs.existsSync(CONFIG_FILE_PATH)) {
      fs.writeFileSync(CONFIG_FILE_PATH, '', CONFIG_FILE_ENCODING)
    }
    return true
  } catch (error) {
    console.log('❗️ 用户配置文件读取失败')
    console.log(error)
    return false
  }
}

/**
 * 获取配置文件的 user-id 数据
 *
 * @returns 从配置文件读取到的 user-id
 */
export const readUserId = () => {
  if (!checkOrCreatConfigFile()) return

  try {
    const dataStr = fs.readFileSync(CONFIG_FILE_PATH, CONFIG_FILE_ENCODING)
    const dataObj = ini.parse(dataStr)
    const userId = dataObj[CONFIG_FILE_SUPPORTED_KEYS.userId]
    if (userId) {
      return userId
    } else {
      console.log('❗️ 尚未设置豆瓣用户信息!\n请执行 `dscan config user-id xxxxx`，以设置用户信息\nuser-id 来自 key 为 dbcl2 的 cookie 值中')
    }
  } catch (error) {
    console.log('❗️ 后端服务地址构建失败，请联系软件开发人员')
    console.log(error)
  }
}
