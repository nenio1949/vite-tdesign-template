/*
 * @Description: 系统状态管理
 * @Author: yong.li
 * @Date: 2024-01-04 11:51:45
 * @LastEditors: yong.li
 * @LastEditTime: 2024-09-29 15:55:34
 */
import { createWithEqualityFn } from 'zustand/traditional'
import siteMetadata from '@/config/siteMetadata'
import { BreadcrumbItemType, CurrentUserInfo } from '@/types'
import localStorage from '@/utils/localStorage'

interface ISystemState {
  colorPrimary: string
  isSiderCollapsed: boolean
  breadcrumbs: BreadcrumbItemType[]
  currentUserInfo?: CurrentUserInfo | null
  themeSetup: (colorPrimary: string) => void
  themeReset: () => void
  siderCollapsedSetup: () => void
  breadcrumbSetup: (breadcrumbs: BreadcrumbItemType[]) => void
  breadcrumbReset: () => void
  currentUserInfoSetup: (currentUserInfo?: CurrentUserInfo) => void
  themeMode: 'light' | 'dark'
  themeModeSetup: (mode: 'light' | 'dark') => void
}

const initThemeColor = siteMetadata.themeConfig.primaryColor // 获取初始主题颜色
const initSiderCollapsed = siteMetadata.isSiderCollapsed // 获取初始菜单折叠状态
const initBreadcrumbs: BreadcrumbItemType[] = [] // 获取初始面包屑（追加在既有路径之后）
const initCurrentUserInfo = localStorage.get('_USER_INFO') // 获取初始人员信息
/**
 * 本地缓存主题颜色，强行转成字符串，十六进制#取值解析问题
 * @param color
 */
const handleLocalStorageTheme = (color: string) => {
  localStorage.set('_THEME', `${color}`)
}

const useSystemStore = createWithEqualityFn<ISystemState>(
  (set) => ({
    colorPrimary: localStorage.get('_THEME') || initThemeColor,
    isSiderCollapsed: localStorage.get('_SIDER_COLLAPSED') === 'false' ? false : initSiderCollapsed,
    breadcrumbs: initBreadcrumbs,
    currentUserInfo: initCurrentUserInfo,
    themeMode: 'light',
    /**
     * 设置主题颜色
     * @param colorPrimary
     * @returns object
     */
    themeSetup: (colorPrimary: string) =>
      set(() => {
        handleLocalStorageTheme(colorPrimary)
        return { colorPrimary }
      }),
    /**
     * 重置设置主题颜色
     * @returns object
     */
    themeReset: () =>
      set(() => {
        handleLocalStorageTheme(initThemeColor)
        return {
          colorPrimary: initThemeColor
        }
      }),
    /**
     * 设置菜单折叠状态
     * @returns object
     */
    siderCollapsedSetup: () =>
      set((state) => {
        const thisIsSiderCollapsed = !state.isSiderCollapsed
        localStorage.set('_SIDER_COLLAPSED', `${thisIsSiderCollapsed}`)
        return { isSiderCollapsed: thisIsSiderCollapsed }
      }),
    /**
     * 设置面包屑（追加值）
     * @param breadcrumbs
     * @returns
     */
    breadcrumbSetup: (breadcrumbs: BreadcrumbItemType[]) => set(() => ({ breadcrumbs })),
    /**
     * 重置面包屑（追加值）
     * @returns object
     */
    breadcrumbReset: () => set(() => ({ breadcrumbs: initBreadcrumbs })),
    /**
     * 设置当前用户信息
     * @returns
     */
    currentUserInfoSetup: (currentUserInfo?: CurrentUserInfo) =>
      set(() => {
        if (currentUserInfo) {
          localStorage.set('_USER_INFO', currentUserInfo, 'crypto-hash')
        }
        return { currentUserInfo }
      }),
    /**
     * 设置主题模式
     * @param mode 模式
     * @returns
     */
    themeModeSetup: (mode: 'light' | 'dark') =>
      set(() => {
        return { themeMode: mode }
      })
  }),
  Object.is // 表示浅比较
)

export default useSystemStore
