/*
 * @Description: 天气管理
 * @Author: yong.li
 * @Date: 2024-01-05 13:46:45
 * @LastEditors: yong.li
 * @LastEditTime: 2024-01-08 10:00:10
 */
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Loading } from 'tdesign-react'
import AuthValidator from '@/components/AuthValidator'
import WeatherList from './list'

/**
 * 天气管理
 */
export default function Weather() {
  return (
    <>
      <Routes>
        <Route
          index={true}
          element={
            <Suspense fallback={<Loading />}>
              <AuthValidator module="/console/weather" type="component" operate="view">
                <WeatherList />
              </AuthValidator>
            </Suspense>
          }
        />
      </Routes>
    </>
  )
}
