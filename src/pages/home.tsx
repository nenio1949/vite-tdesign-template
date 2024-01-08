/*
 * @Description: 首页（也可能是过渡页）
 * @Author: qingzi.wang
 * @Date: 2023-05-09 09:20:40
 * @LastEditTime: 2024-01-05 16:32:13
 */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loading } from 'tdesign-react'

export default function Home() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/workbench')
  }, [])
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Loading loading />
    </div>
  )
}
