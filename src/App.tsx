import { useState, useCallback, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import zhCN from 'tdesign-react/es/locale/zh_CN'
import { ConfigProvider, Loading } from 'tdesign-react'
import { routes } from '@/routes'
import { shallow } from 'zustand/shallow'
import { useSystemStore } from '@/store'
import siteMetadata from '@/config/siteMetadata'
import localStorage from '@/utils/localStorage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import api from './service/api'
import { syncLocalStorageToSessionStorage } from './utils/syncStorage'

let timer: NodeJS.Timeout | null = null

const Main = () => {
  // ReactQuery实例，放里面数据不会在不同的用户和请求之间共享
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // 是否窗口重新聚焦是刷新数据
            staleTime: 0 // 查询过期时间，1小时
            // structuralSharing: true, // 是否开启结构共享，默认开启，可以提高性能
          }
        }
      })
  )
  // 主题色
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true)
  const [themeColor, setThemeColor] = useState(siteMetadata.themeConfig.primaryColor)
  const { colorPrimary } = useSystemStore(
    useCallback((state) => state, []),
    shallow
  )

  useEffect(() => {
    if (localStorage.get('_USER_INFO')) {
      handleGetAuthority()
    } else {
      setIsAuthLoading(false)
    }
  }, [])
  /**
   * 初始化主题色
   */
  const handleInitTheme = async () => {
    const cacheColor = localStorage.get('_THEME') || themeColor
    document.documentElement.setAttribute('style', `--td-brand-color: ${cacheColor}`)
    setThemeColor(cacheColor)
  }

  /**
   * hex转rgba
   * @param hex hex色值
   * @returns rgb
   */
  // const HexToRGBA = (hex: string, opacity: number = 1) => {
  //   const r = parseInt(hex.slice(0, 2), 16) * 255
  //   const g = parseInt(hex.slice(2, 4), 16) * 255
  //   const b = parseInt(hex.slice(4, 6), 16) * 127

  //   return `rgba(${r}, ${g}, ${b}, ${opacity})`
  // }
  /**
   * 移除页面加载遮罩
   */
  const handleRemoveAppLoadingMask = () => {
    const appLoadingMask = document.getElementById('d-app-loading-mask')
    if (appLoadingMask) {
      timer = setTimeout(() => {
        appLoadingMask.remove()
      }, 150)
    }
  }
  /**
   * 获取权限
   */
  const handleGetAuthority = async () => {
    const { errcode, data } = await api.getCurrentAuthority()
    if (errcode === 0) {
      localStorage.set('_USER_AUTHCODE', data, 'crypto-hash')
    } else {
      window.location.href = '/login'
      localStorage.set('_USER_AUTHCODE', [], 'crypto-hash')
    }
    setIsAuthLoading(false)
  }
  useEffect(() => {
    // 确保localStorage的操作在客户端执行
    syncLocalStorageToSessionStorage()
    handleInitTheme()
    handleRemoveAppLoadingMask()
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [colorPrimary])

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider globalConfig={zhCN}>
        {isAuthLoading ? (
          <Loading
            loading
            style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          />
        ) : (
          <RouterProvider router={routes} />
        )}
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default Main
