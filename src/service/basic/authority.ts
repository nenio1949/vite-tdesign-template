import axios from '../request'
import { ParamType } from '@/types'

/**
 * 获取指定权限详情
 */
const getAuthority = async (id: number) => {
  return axios({ api: `/v1/web/console/authorities/${id}` })
}

/**
 * 更新权限
 */
const updateAuthority = async (id: number, params?: ParamType) => {
  return axios({ api: `/v1/web/console/authorities/${id}`, method: 'PUT', params })
}

/**
 * 获取当前人员的权限
 */
const getCurrentAuthority = async () => {
  return axios({ api: `/v1/web/console/user-authorities` })
}

export default {
  getAuthority,
  updateAuthority,
  getCurrentAuthority
}
