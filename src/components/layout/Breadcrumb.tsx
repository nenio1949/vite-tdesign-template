/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Description: 面包屑
 * @Author: yong.li
 * @Date: 2024-01-04 10:59:11
 * @LastEditors: yong.li
 * @LastEditTime: 2024-01-08 09:59:11
 */

import { JSXElementConstructor, ReactElement, useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { Breadcrumb } from 'tdesign-react'
import { shallow } from 'zustand/shallow'
import { useSystemStore } from '@/store'
import menuItems from '@/config/menu'
import format from '@/utils/format'
import { BreadcrumbItemType } from '@/types'

const { BreadcrumbItem } = Breadcrumb

const homeBreadcrumb = {
  key: '/',
  href: '/',
  title: <Link to="/">首页</Link>
}

/**
 * 面包屑
 */
export default function MainBreadcrumb() {
  const location = useLocation()
  const [search] = useSearchParams()
  const { breadcrumbs: systemBreadcrumbs } = useSystemStore((state) => state, shallow)
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItemType[]>([])

  useEffect(() => {
    const menuHash = format.menusToHash(menuItems)

    if (location) {
      let queryRouteKey = ''
      const linkPath = location.pathname.split('/')
      linkPath.shift()

      if (search.get('route')) {
        queryRouteKey = search.get('route') as string
      }

      const paths: BreadcrumbItemType[] = linkPath
        .map((_path: string, i: number) => {
          let href = `/${linkPath.slice(0, i + 1).join('/')}`
          const isFirstPath = i === 0
          const isLastPath = i == linkPath.length - 1
          let routeHash: any = {}

          // 不同菜单主路径一致情况使用route参考区分，如: /system/user?route=add 其key值为 /system/user_add
          if (queryRouteKey && isLastPath) {
            href += `_${queryRouteKey}`
          }

          const menuHref = menuHash[href] as ReactElement<any, string | JSXElementConstructor<any>>

          // 通过菜单数据生成面包屑，即匹配上的路径才显示
          if (menuHash[href] && typeof menuHash[href] === 'object' && menuHref.props.children) {
            if (isFirstPath || isLastPath) {
              // 控制末级节点不可点击，下同
              routeHash = { key: menuHref.props.to, title: menuHref.props.children }
            } else {
              routeHash = { key: href, title: <Link to={href}>{menuHref.props.children}</Link> }
            }
          } else if (!['', '/'].includes(href) && menuHref) {
            if (isFirstPath || isLastPath) {
              routeHash = { key: href, title: menuHref }
            } else {
              routeHash = { key: href, title: <Link to={href}>{menuHref}</Link> }
            }
          }

          return Object.keys(routeHash).length > 0 ? routeHash : false
        })
        .filter(Boolean)
      setBreadcrumbs([...paths, ...systemBreadcrumbs])
    }
  }, [location, systemBreadcrumbs])

  if (breadcrumbs.length > 0) {
    return (
      <Breadcrumb>
        {[homeBreadcrumb, ...breadcrumbs].map((item) => {
          return <BreadcrumbItem key={item.key}>{item.title}</BreadcrumbItem>
        })}
      </Breadcrumb>
    )
  } else {
    return null
  }
}
