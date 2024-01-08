import { useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'tdesign-react'
import Breadcrumb from './Breadcrumb'
import siteMetadata from '@/config/siteMetadata'
import MainHeader from './Header'
import MainAside from './Aside'
import MainFooter from './Footer'
import { shallow } from 'zustand/shallow'
import { useSystemStore } from '@/store'

const { Header, Footer, Aside, Content } = Layout

export default function MainLayout() {
  const { isSiderCollapsed } = useSystemStore(
    useCallback((state) => state, []),
    shallow
  )

  return (
    <Layout className="d-layout">
      <Header className="d-layout-header">
        <MainHeader />
      </Header>
      <Layout className="d-layout-body">
        <Aside className="d-layout-sider" width={isSiderCollapsed ? '78px' : '250px'}>
          <MainAside />
        </Aside>
        <Layout>
          <Content className="d-layout-content-container">
            {
              /* 面包屑 */
              siteMetadata.isVisibleBreadcrumb && (
                <div className="d-layout-breadcrumb">
                  <Breadcrumb />
                </div>
              )
            }
            <div className="d-layout-content">
              <Outlet />
            </div>
          </Content>
          <Footer className="d-layout-footer">
            <MainFooter />
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}
