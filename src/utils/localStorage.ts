import CryptoJS from 'crypto-js'

const aseKey = 'vite-tdesign-template' // 秘钥

interface HashType {
  type: string
  data: string
}

/**
 * crypt加密
 * @param content 加密内容
 */
const encrypt = (content: object | string | number | boolean): string | boolean => {
  if (!content) {
    return false
  }
  const messageStr = content instanceof Object ? JSON.stringify(content) : content.toString()
  const ciphertext = CryptoJS.AES.encrypt(messageStr, aseKey).toString()
  return ciphertext
}

/**
 * crypt解密
 * @param encryptStr 解密内容
 * @returns
 */
const decrypt = (encryptStr: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptStr, aseKey)
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
  return decryptedData
}
/**
 * 处理本地信息（删除）
 * @param {*} name
 */
const remove = (name: string) => {
  localStorage.removeItem(name)
  sessionStorage.removeItem(name)
}

/**
 * 处理本地信息（清理）
 */
const clear = () => {
  if (typeof window == 'undefined') return false
  localStorage.clear()
  sessionStorage.clear()
}

/**
 * 处理本地信息（读）
 * @param {*} name
 * @returns
 */
const get = (name: string) => {
  if (typeof window === 'undefined') return false

  const dataStr = sessionStorage.getItem(name) || localStorage.getItem(name)
  let hash: HashType = { type: '', data: '' }

  if (dataStr) {
    // 加入try-catch防止内容变化
    try {
      hash = JSON.parse(dataStr)

      const { type, data } = hash

      let newData
      // 如果是加密类型，需要进行解密后返回
      if (type) {
        switch (type) {
          case 'crypto-hash':
            newData = JSON.parse(decrypt(data))
            break
          case 'crypto-string':
            newData = decrypt(data)
            break
          default:
            newData = data
            break
        }
      } else {
        newData = data
      }
      return newData
    } catch (error) {
      console.warn('获取本地数据', error)
      return false
    }
  }

  return false
}

/**
 * 处理本地信息（写），统一使用对象{}包裹
 * _AUTHCODE => crypto-hash
 * _USER_INFO => crypto-hash
 * _FILETASK_X
 * _AVATAR
 * _THUMB_AVATAR
 * _IS_REFRESH_WORKBENCH
 * _PROJECT_FILTER_STATUS
 * _PROJECT_INFO_TABS
 * _PROJECT_INFO
 * _BORROW_CONDITIONS
 * @param name  名称
 * @param data 数据体
 * @param type  类型（如：crypto标识为加密对象）
 * @returns
 */
const set = (name: string, data: object | string | number | boolean, type?: string) => {
  if (typeof window == 'undefined') return false

  const newData = type && ['crypto-hash', 'crypto-string'].includes(type) ? encrypt(data) : data
  const saveData = {
    type,
    data: newData
  }

  localStorage.setItem(name, JSON.stringify(saveData))
  sessionStorage.setItem(name, JSON.stringify(saveData))

  return true
}

const localStorageConfig = {
  remove,
  clear,
  get,
  set
}

export default localStorageConfig
