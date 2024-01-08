/*
 * @Description: 左侧菜单栏
 * @Author: yong.li
 * @Date: 2024-01-04 10:47:49
 * @LastEditors: yong.li
 * @LastEditTime: 2024-01-08 09:58:51
 */
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Menu, MenuValue } from 'tdesign-react'
import { ViewListIcon } from 'tdesign-icons-react'
import { shallow } from 'zustand/shallow'
import menuItems, { MenuType } from '@/config/menu'
import { useSystemStore } from '@/store'
import operate from '@/utils/operate'
import moduleGroupAuthCodeConfig, { Module } from '@/config/moduleGroupAuthCode'

const { SubMenu, MenuItem } = Menu

export default function MainAside() {
  const location = useLocation()
  const navigate = useNavigate()
  const [active, setActive] = useState<MenuValue>('')
  const [expands, setExpands] = useState<MenuValue[]>([])
  const { isSiderCollapsed, siderCollapsedSetup } = useSystemStore(
    useCallback((state) => state, []),
    shallow
  )
  const whiteMenus: React.Key[] = ['/workbench']

  useEffect(() => {
    const strArr = location.pathname.split('/')
    if (strArr.length > 2) {
      setExpands([`/${strArr[1]}`])
    } else {
      setExpands([])
    }
    setActive(location.pathname)
  }, [location, isSiderCollapsed])

  /**
   * 构造菜单
   * @param menuItems 菜单数据
   * @returns
   */
  const generateMenuItems = (menuItems: MenuType[]) => {
    const datas: React.ReactNode[] = []
    menuItems.map((item) => {
      if (whiteMenus.includes(item.key)) {
        // 属于白名单
        if (item.children) {
          const items = generateMenuItems(item.children)
          datas.push(
            <SubMenu key={item.key} value={item.key} icon={item.icon} title={item.label}>
              {items}
            </SubMenu>
          )
        } else {
          datas.push(
            <MenuItem key={item.key} value={item.key} icon={item.icon}>
              {item.label}
            </MenuItem>
          )
        }
      } else {
        if (item.children && item.children.length > 0) {
          // 有子级菜单
          let haschildrenViewAuth = false
          item.children.map((child) => {
            const auth = operate.authCheckFunction(moduleGroupAuthCodeConfig[child.key as Module])
            if (auth?.view || whiteMenus.includes(child.key)) {
              haschildrenViewAuth = true
            }
          })
          if (haschildrenViewAuth) {
            // 仅子级菜单有权限才显示
            const items = generateMenuItems(item.children)
            datas.push(
              <SubMenu key={item.key} value={item.key} icon={item.icon} title={item.label}>
                {items}
              </SubMenu>
            )
          }
        } else {
          // 无子级菜单
          const auth = operate.authCheckFunction(moduleGroupAuthCodeConfig[item.key as Module])
          if (auth?.view) {
            datas.push(
              <MenuItem key={item.key} value={item.key} icon={item.icon}>
                {item.label}
              </MenuItem>
            )
          }
        }
      }
    })
    return datas
  }

  return (
    <Menu
      width="100%"
      value={active}
      collapsed={isSiderCollapsed}
      expanded={expands}
      onExpand={(keys) => setExpands(keys)}
      onChange={(value) => {
        navigate(value as string)
      }}
      operations={
        <Button variant="text" shape="square" icon={<ViewListIcon />} onClick={() => siderCollapsedSetup()} />
      }
    >
      {generateMenuItems(menuItems)}
    </Menu>
  )
}
