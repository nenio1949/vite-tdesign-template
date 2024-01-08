import { DashboardIcon, Setting1Icon } from 'tdesign-icons-react'
import { TElement } from 'tdesign-react/es/common'

export interface MenuType {
  key: string
  icon?: TElement
  label: React.ReactNode
  children?: MenuType[]
}

const menuItems: MenuType[] = [
  {
    key: '/workbench',
    icon: <DashboardIcon />,
    label: '工作台'
  },
  {
    key: '/console',
    icon: <Setting1Icon />,
    label: '系统配置',
    children: [
      {
        key: '/console/organization',
        label: '部门管理'
      },
      {
        key: '/console/weather',
        label: '天气管理'
      }
    ]
  }
]

export default menuItems
