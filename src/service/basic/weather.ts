import axios from '../request'
import { ParamType } from '@/types'

/**
 * 获取天气列表
 * @param params 查询参数
 */
const getWeathers = async (params?: ParamType) => {
  return axios({ api: `/v1/web/console/weathers`, params })
}
/**
 * 新增天气
 * @param params 天气信息参数
 */
const createWeather = async (params?: ParamType) => {
  return axios({ api: `/v1/web/console/weather`, method: 'POST', params })
}

export default {
  getWeathers,
  createWeather
}
