/*
 * @Description: 基础配置数据
 * @Author: qingzi.wang
 * @Date: 2023-04-12 09:26:34
 * @LastEditTime: 2024-02-19 09:14:09
 */
import localFullLogoPath from '@/assets/images/logo.svg'
import localLogoPath from '@/assets/images/logo-mini.svg'

export interface GConfig {
  title: string
  copyright: string
  headerTitle: string
  description: string
  slogan: string
  language: 'zh-cn' | 'en-us'
  locale: 'zh-cn' | 'en-us'
  isVisibleBreadcrumb: boolean
  isVisibleFooter: boolean
  isSiderCollapsed: boolean
  isVisibleMaskLoading: boolean
  siteLogo: string
  docHost: string
  filePreviewServiceHost: string
  uploadQiNiuUrl: string
  manualUrl: string
  maxUploadSize: number
  gaode: {
    placeUrl: string
    key: string
    center: number[]
  }
  env: {
    serverHost: string
    versionType: string
  }
  themeConfig: {
    primaryColor: string
    theme: 'light' | 'dark'
    defaultThemes: string[]
  }
  formItemLayout: {
    labelCol: {
      span: number
    }
    wrapperCol: {
      span: number
    }
  }
  webSocketUrl: string
  /** 基础数据缓存时间(s) */
  basicDataCacheTime: number
}
const year = new Date().getFullYear()
const siteMetadata = {
  title: 'vite+react+ts+tdesign模板',
  copyright: `北京XXX科技有限公司 技术支持 Copyright ©${year}`,
  headerTitle: 'Reactjs+Antd+Typescript',
  description: '基于Reactjs、React-router、Antd-design的开发模版项目',
  slogan: '科技向善，数据为先',
  language: 'zh-cn', // en-us, zh-cn
  locale: 'zh-cn', // en-us, zh-cn
  isVisibleBreadcrumb: true, // 是否显示面包屑
  isVisibleFooter: true, // 是否显示底部
  isSiderCollapsed: false, // 是否收起菜单
  isVisibleMaskLoading: true, // 是否显示全局遮罩loading
  siteLogo: localLogoPath, // 仅logo图标
  siteFullLogo: localFullLogoPath, // 完整logo
  docHost: 'http://docs.cq-tct.com', // 文件存储服务地址
  filePreviewServiceHost: 'http://fps.funenc.xyz:2112', // 文件预览服务地址
  uploadQiNiuUrl: 'https://upload.qiniup.com', // 七牛上传地址
  gaode: {
    key: '4fb36049540f94bf5c48060860604294',
    securityJsCode: '85a97345251b9fc18c13bb4838cb2fed',
    center: [113.776448, 34.752176]
  }, // 高德服务（当前为个人账号）
  manualUrl: '', // 操作手册地址
  maxUploadSize: 104857600, // 文件上传最大限制100MB（1024*1024*100）
  env: {
    serverHost: import.meta.env.VITE_APP_SERVER_HOST,
    versionType: import.meta.env.VITE_APP_SYSTEM_VERSION_TYPE
  },
  exportUrl: `${import.meta.env.VITE_APP_SERVER_HOST}/v1/web/export`,
  themeConfig: {
    primaryColor: '#b40d0d',
    theme: 'light', // 主题模式：light, dark
    defaultThemes: ['#1890ff', '#00b96b', '#ff00ff', '#ffa500', '#800080', '#ff0000'] // 默认主题
  }, // 主题配置
  formItemLayout: {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 19
    }
  }, // form表单空格设置
  webSocketUrl: import.meta.env.VITE_APP_WS_HOST, // ws地址
  /** 基础数据缓存时间(s) */
  basicDataCacheTime: 5 * 60
}

export default siteMetadata
