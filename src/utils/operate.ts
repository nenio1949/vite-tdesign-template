/*
 * @Description: 操作类
 * @Author: yong.li
 * @Date: 2023-03-06 14:39:11
 * @LastEditors: yong.li
 * @LastEditTime: 2024-01-08 10:04:41
 */
import { isEqual as _isEqual, omitBy as _omitBy } from 'lodash'
import localStorageConfig from './localStorage'
import { Operates } from '@/config/moduleGroupAuthCode'
import { ParamType } from '@/types'

const aseKey = 'zhengzhou-repair-maintenance-web' // 秘钥

export interface ModuleGroupAuth {
  [key: string]: boolean
}

/**
 * 获取当前人员指定授权码对应是否有权限
 * @param authCode 自定义模块名称 Array
 * @returns { Operates: false/true, }
 */
const authCheckFunction = (authCode: { [key in Operates]?: string }) => {
  if (!authCode) return
  const userAuth = localStorageConfig.get('_USER_AUTHCODE') || []
  const res: { [key in Operates]?: boolean } = {}
  Object.keys(authCode).map((key) => {
    const auth = authCode[key as Operates]

    if (auth) {
      res[key as Operates] = userAuth.includes(auth)
    }
  })
  return res
}

/**
 * 对象比较（主要用于判断form表单数据是否发生变化）
 * @param object1
 * @param object2
 * @returns boolean true表示存在区别，false表示无区别
 */
const handleShallowEqual = (object1?: ParamType, object2?: ParamType) => {
  return !_isEqual(
    _omitBy(object1, (value) => value === undefined || value === null),
    _omitBy(object2, (value) => value === undefined || value === null)
  )
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
 * 计算时间差
 * @param startTime 起始时间
 * @param endTime 结束时间
 * @returns 时长(天/小时/分/1分钟内)
 */
const calculateTimeDifference = (startTime: string, endTime: string) => {
  const diff = new Date(endTime).getTime() - new Date(startTime).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  if (days > 0) {
    return `${days}天${hours}小时${minutes}分`
  } else if (hours > 0) {
    return `${hours}小时${minutes}分`
  } else if (minutes > 0) {
    return `${minutes}分`
  } else {
    return '1分钟内'
  }
}

const operateConfig = {
  authCheckFunction,
  handleShallowEqual,
  encrypt,
  decrypt,
  calculateTimeDifference
}

export default operateConfig
