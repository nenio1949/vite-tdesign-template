/*
 * @Description: 登录
 * @Author: yong.li
 * @Date: 2024-01-04 10:56:01
 * @LastEditors: yong.li
 * @LastEditTime: 2024-01-08 09:59:46
 */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockOnIcon, UserIcon } from 'tdesign-icons-react'
import { Loading, Button, Checkbox, Form, Input, SubmitContext } from 'tdesign-react'
import { shallow } from 'zustand/shallow'
import siteMetadata from '@/config/siteMetadata'
import { useSystemStore } from '@/store'
import api from '@/service/api'
import styles from './styles/login.module.less'

const { FormItem } = Form

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { currentUserInfoSetup } = useSystemStore((state) => state, shallow)

  /**
   * 登录
   */
  const handleSubmit = async (context: SubmitContext) => {
    console.log(context)
    if (context.validateResult === true) {
      setLoading(true)
      const { errcode, data } = await api.login(context.fields)
      setLoading(false)
      if (errcode === 0) {
        currentUserInfoSetup(data)
        navigate('/dashboard')
      }
    }
  }

  return (
    <div className={styles['d-login-container']}>
      <div className={styles['d-login']}>
        <div className={styles['d-login__logo']}>
          <img src={siteMetadata.siteFullLogo} alt="logo" />
        </div>
        {/* <div className={styles['d-login__title']}>欢迎登录</div> */}
        <div className={styles['d-login__subtitle']}>{siteMetadata.title}</div>
        <div className={styles['d-login__form']}>
          <Loading loading={loading}>
            <Form layout="vertical" labelWidth={100} initialData={{ remember: true }} onSubmit={handleSubmit}>
              <FormItem name="login" label="用户名" rules={[{ required: true, message: '请输入你的用户名!' }]}>
                <Input
                  prefixIcon={<UserIcon className="site-form-item-icon" />}
                  placeholder="请输入用户名"
                  size="large"
                  clearable
                />
              </FormItem>
              <FormItem name="password" label="密码" rules={[{ required: true, message: '请输入你的密码!' }]}>
                <Input
                  prefixIcon={<LockOnIcon className="site-form-item-icon" />}
                  type="password"
                  placeholder="请输入密码"
                  size="large"
                  clearable
                />
              </FormItem>
              <FormItem>
                <FormItem name="remember">
                  <Checkbox>记住我</Checkbox>
                </FormItem>
              </FormItem>
              <FormItem>
                <Button theme="primary" type="submit" block size="large">
                  立即登录
                </Button>
              </FormItem>
            </Form>
          </Loading>
        </div>
        <div className={styles['d-login__footer']}>{siteMetadata.copyright}</div>
      </div>
    </div>
  )
}

export default Login
