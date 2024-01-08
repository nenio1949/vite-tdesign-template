/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 基础对象声明
 */
export interface BaseObject {
  id: number
  name: string
}
/**
 * 面包屑类型声明
 */
export interface BreadcrumbItemType {
  key: string
  title?: React.ReactNode
  href?: string
}

/**
 * 接口返回类型声明
 */
export interface ApiResponseType {
  errcode: number | string
  msg: string
  data: any
}

/**
 * 当前人员信息声明
 */
export interface CurrentUserInfo {
  name: string
  group: string
  role: string
  avatar: string
  id: number
  department: BaseObject
  isChangePassword: boolean
  accessToken: string
  accessTokenTime: string
  refreshToken: string
  refreshTokenTime: string
  mobile: string
}

/**
 * 接口参数类型声明
 */
export interface ParamType {
  [key: string]: any
}

/**
 * 分页参数声明
 */
export interface PaginationType {
  page: number
  size: number
}
