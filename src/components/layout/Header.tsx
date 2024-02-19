/*
 * @Description: 页头
 * @Author: yong.li
 * @Date: 2024-01-04 10:47:18
 * @LastEditors: yong.li
 * @LastEditTime: 2024-02-19 09:04:52
 */
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Button, Popup, Tooltip, DialogPlugin, ColorPicker } from 'tdesign-react'
import { HelpCircleIcon } from 'tdesign-icons-react'
import siteMetadata from '@/config/siteMetadata'
import formatConfig from '@/utils/format'
import api from '@/service/api'
import { shallow } from 'zustand/shallow'
import { useSystemStore } from '@/store'
import localStorage from '@/utils/localStorage'

let timeInterval: NodeJS.Timeout

const weekEnums: { [key: number]: string } = {
  0: '日',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六'
}

export default function MainHeader() {
  const navigate = useNavigate()
  const userAvatar = 'http://static.dingtalk.com/media/lADOACOdmMygzKA_160_160.jpg'
  const [currentDate, setCurrentDate] = useState<string>('')
  const [weather, setWeather] = useState<string>('')
  const { currentUserInfo, currentUserInfoSetup, colorPrimary, themeSetup } = useSystemStore((state) => state, shallow)

  useEffect(() => {
    handleGetCurrentDate()
    handleGetLiveWeather()
    if (timeInterval) {
      clearInterval(timeInterval)
    }
    timeInterval = setInterval(() => {
      handleGetCurrentDate()
    }, 1000 * 60)

    return () => {
      clearInterval(timeInterval)
    }
  }, [])

  /**
   * 获取日期
   */
  const handleGetCurrentDate = () => {
    const date = new Date()
    const dateTime = formatConfig.date(date, 'YYYY年MM月DD日')
    const week = date.getDay()
    setCurrentDate(dateTime + ` 周${weekEnums[week]}`)
  }

  /**
   * 获取天气
   */
  const handleGetLiveWeather = async () => {
    const { errcode, data } = await api.getLiveWeather()
    if (errcode === 0) {
      setWeather(data.lives[0]?.weather)
    }
  }

  /**
   * 退出登录
   */
  const handleLogout = () => {
    const DialogInstance = DialogPlugin.confirm({
      header: '退出登录确认',
      body: '确认要退出登录？',
      closeBtn: false,
      onConfirm: () => {
        DialogInstance.hide()
        currentUserInfoSetup()
        localStorage.clear()
        navigate('/login')
      },
      onCancel: () => {
        DialogInstance.hide()
      }
    })
  }

  const userInfoDOMs = (
    <div className="d-header-userinfo-panel">
      {userAvatar ? (
        <Avatar
          size="medium"
          image={userAvatar}
          style={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
            marginBottom: 10
          }}
        />
      ) : (
        <Avatar
          size="medium"
          style={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
            marginBottom: 10
          }}
        >
          {userAvatar || 'F'}
        </Avatar>
      )}
      <ul>
        <li>
          <strong>{currentUserInfo?.name}</strong>
        </li>
        <li>
          <Button variant="text" block disabled>
            修改密码
          </Button>
        </li>
        <li>
          <Button variant="text" theme="danger" block onClick={handleLogout}>
            退出
          </Button>
        </li>
      </ul>
    </div>
  )

  return (
    <div className="d-header">
      <div className="d-header-brand">
        <div className="d-header-logo">
          <img src={siteMetadata.siteLogo} alt="logo" />
        </div>
        <span className="d-header-title">{siteMetadata.title}</span>
        <span className="d-header-describe">{siteMetadata.env.versionType}</span>
      </div>
      <div className="d-header-nav">
        <ul>
          <li>{currentDate}</li>
          <li>{weather}</li>
          <li>
            <ColorPicker defaultValue={colorPrimary} format="HEX" onChange={(value) => themeSetup(value)} />
          </li>
          <li>
            <Tooltip content="查看操作手册" placement="bottom">
              <Link to={siteMetadata.manualUrl} target="view_window" className="d-header-nav-icon">
                <HelpCircleIcon style={{ fontSize: 18, fontWeight: 600 }} />
              </Link>
            </Tooltip>
          </li>
          <li>
            <Popup placement="bottom-right" showArrow={false} content={userInfoDOMs}>
              <span
                className="d-header-user"
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%'
                }}
              >
                <Avatar size="small" image={userAvatar} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} />
                <span style={{ padding: '0 3px' }}>{currentUserInfo?.name}</span>
              </span>
            </Popup>
          </li>
        </ul>
      </div>
    </div>
  )
}
