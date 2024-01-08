/*
 * @Description: 格式化工具
 * @Author: qingzi.wang
 * @Date: 2023-04-12 09:53:03
 * @LastEditTime: 2024-01-08 10:00:54
 */

import { ReactNode } from 'react'
import dayjs from 'dayjs'
import { MenuType } from '@/config/menu'

/**
 * 时间格式化
 * @param time 时间
 * @param type 类型，默认为YYYY-MM-DD
 * @returns
 */
const date = (time: string | number | Date | dayjs.Dayjs | null | undefined, type?: string) => {
  if (time) {
    return dayjs(time).format(type || 'YYYY-MM-DD')
  } else {
    return '-'
  }
}
/**
 * 将菜单数据转换为hash表
 * @param lists 菜单列表
 * @returns
 */
const handleMenusToHash = (lists: MenuType[]) => {
  const newObj: { [key: string]: ReactNode } = {}
  const digui = (lists: MenuType[]) => {
    lists.forEach((item: MenuType) => {
      // 遍历数组项的对象
      for (const key in item) {
        // 将需要的值添加到新对象中
        if (key === 'key') newObj[item.key] = item.label
        // 如果有子项,需要用到递归
        if (key === 'children') digui(item[key] || [])
      }
    })
  }

  // 调用一下递归函数
  digui(lists)

  return newObj
}

const formatConfig = {
  date,
  menusToHash: handleMenusToHash
}
export default formatConfig
