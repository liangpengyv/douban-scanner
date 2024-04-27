const os = require('os')
const path = require('path')

module.exports = {
  // 配置文件 CONFIG_FILE_...
  CONFIG_FILE_PATH: path.join(os.homedir(), '.dscanconfig'),
  CONFIG_FILE_ENCODING: 'utf8',
  CONFIG_FILE_SUPPORTED_KEYS: {
    userId: 'user-id'
  },

  // mouban 服务 SERVER_MOUBAN_...
  SERVER_MOUBAN_BASE_URL: 'https://mouban.mythsman.com'
}
