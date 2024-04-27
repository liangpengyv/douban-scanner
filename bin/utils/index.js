const fs = require('fs')

const {
  CONFIG_FILE_PATH,
  CONFIG_FILE_ENCODING
} = require('../contants')

/**
 * 检查配置文件是否存在（若文件不存在，将创建该文件）
 *
 * @returns 最终是否存在配置文件
 */
const checkOrCreatConfigFile = () => {
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

module.exports = {
  checkOrCreatConfigFile
}
