import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '@/components/layout/Layout'
import Home from '@/pages/home'
import Login from '@/pages/common/login'
import NoMatch from '@/pages/common/noMatch'
import ErrorPage from '@/pages/common/errorPage'
import Workbench from '@/pages/workbench'
import Organization from '@/pages/console/organization'
import Weather from '@/pages/console/weather'

const defaultModuleRoutes = [
  {
    index: true,
    element: <NoMatch />
  },
  {
    path: '*',
    element: <NoMatch />
  }
]

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/workbench',
        element: <Workbench />
      }
    ]
  },
  {
    /* 登录 */
    path: '/login',
    element: <Login />
  },
  {
    /* 控制台管理 */
    path: '/console',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'organization/*',
        element: <Organization />
      },
      {
        path: 'weather/*',
        element: <Weather />
      },
      ...defaultModuleRoutes
    ]
  },
  {
    path: '*',
    element: <NoMatch />
  }
])
