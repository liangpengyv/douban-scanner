import os from 'node:os'
import path from 'node:path'

// 配置文件 CONFIG_FILE_...
export const CONFIG_FILE_PATH = path.join(os.homedir(), '.dscanconfig')
export const CONFIG_FILE_ENCODING = 'utf8'
export const CONFIG_FILE_SUPPORTED_KEYS = {
  userId: 'user-id'
}

// mouban 服务 SERVER_MOUBAN_...
export const SERVER_MOUBAN_BASE_URL = 'https://mouban.mythsman.com'
