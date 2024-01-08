import axios from '../request'
import { ParamType } from '@/types'

/**
 * 登录
 * @param params 参数
 */
const login = async (params?: ParamType) => {
  return axios({ api: '/v1/web/login', method: 'POST', params })
}

/**
 * 获取实时天气
 */
const getLiveWeather = async () => {
  return axios({ api: `/v1/web/console/weather` })
}

export default {
  login,
  getLiveWeather
}
