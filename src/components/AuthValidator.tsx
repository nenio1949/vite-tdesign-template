/*
 * @Description: 权限校验
 * @Author: yong.li
 * @Date: 2023-10-19 15:15:22
 * @LastEditors: yong.li
 * @LastEditTime: 2024-01-04 15:37:34
 */
import moduleGroupAuthCodeConfig, { Module, Operates } from '@/config/moduleGroupAuthCode'
import operateConfig from '@/utils/operate'

export interface AuthValidatorProps {
  children: JSX.Element
  module: Module
  type: 'component' | 'button'
  operate: Operates
}
/**
 * 权限校验(关闭操作即operate=update)
 */
export default function AuthValidator({ children, module, type, operate }: AuthValidatorProps) {
  const auth = operateConfig.authCheckFunction(moduleGroupAuthCodeConfig[module])
  if (type === 'component') {
    return auth && auth[operate] ? children : <span>403 暂无权限访问</span>
  } else {
    return auth && auth[operate] ? children : <></>
  }
}
