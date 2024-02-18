/*
 * @Description: 基于antd、axios的请求处理
 * @Author: yong.li
 * @Date: 2024-01-04 14:05:08
 * @LastEditors: yong.li
 * @LastEditTime: 2024-02-18 09:51:02
 */

import axios, { Method, AxiosRequestConfig } from 'axios'
import { message } from 'tdesign-react'
import { forOwn, remove, findLast } from 'lodash'
import localStorage from '@/utils/localStorage'
import { ApiResponseType } from '@/types'

const baseWaitTime = 100 // 默认的等待时间100毫秒
const requestURLRates: Array<unknown> = [] // 如：{ api: '/api/standardRoles', timestamp: 1596597701181 }

interface RemoveParam {
  api: string
  timestamp: number
}
interface FindLastParam {
  api: string
}
interface CustomRequestConfig {
  api: string
  method?: Method
  params?: object | null
  headers?: { [key: string]: string }
  serverHost?: string
  maxRequestCycleCount?: number
  returnAll?: boolean
}

/**
 * 请求出入口
 * @param {*} api 地址
 * @param {*} method 方法，默认为GET
 * @param {*} params 参数，默认为空对象
 * @param {*} maxRequestCycleCount 最大请求频次（与baseWaitTime结合），默认为1
 * @param {*} serverHost 接口主机地址
 * @param {*} headers 传入头部信息，默认为空对象
 */
export default async function axiosRequest({
  api,
  method = 'GET',
  params = {},
  headers,
  serverHost,
  maxRequestCycleCount = 1
}: CustomRequestConfig) {
  let data = params
  const url = `${serverHost || api}`
  const currentTimestamp = new Date().getTime() // 当前时间戳

  // 针对非GET请求进行限流拦截
  if (method !== 'GET') {
    // 去除当前接口指定周期外的数据
    remove(requestURLRates, (o: unknown) => {
      const param = o as RemoveParam
      return param.api === api && param.timestamp < currentTimestamp - maxRequestCycleCount * baseWaitTime
    })

    // 获取上一次请求信息（一般同周期只有一个，防止处理意外）
    const hasRequestURLRate = findLast(requestURLRates, (o: unknown) => (o as FindLastParam).api === api)

    if (hasRequestURLRate) {
      message.warning('当前访问的频次过高，请适当放慢手速！', 3000)
      // 为了保持数据完整性，返回数据与接口定义一致
      const res: ApiResponseType = {
        errcode: -1,
        msg: '',
        data: null
      }
      return res
    }
    requestURLRates.push({
      api,
      timestamp: new Date().getTime()
    })
  }

  return new Promise<ApiResponseType>((resolve, reject) => {
    const { accessToken } = localStorage.get('_USER_INFO')
    const formData = new FormData()

    if (headers && headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      // 遍历对象转换为formdata对象
      forOwn(params, (value: string, key: string) => {
        formData.append(key, value)
      })
      data = formData
    }

    const sendData: AxiosRequestConfig = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
        authorization: `Bearer ${accessToken}`
      },
      url,
      params: method === 'GET' ? data : {},
      data: data
    }

    axios(sendData)
      .then(async (res) => {
        const response: ApiResponseType = res.data
        const { errcode, msg } = response
        if (errcode !== 0) {
          message.error(msg || '接口数据未知错误！', 3000)
          // 直接跳转到登录页面（简单粗暴）
          if (['401', 401, 2].includes(errcode)) {
            // 清空缓存
            localStorage.clear()
            location.href = '/login'
          }
        }
        resolve(response)
      })
      .catch(async (error) => {
        if (error) {
          message.error('接口请求发生逻辑错误！', 3000)
        }
        reject(error)
      })
  })
}
