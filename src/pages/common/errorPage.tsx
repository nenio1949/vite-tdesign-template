/*
 * @Description: 访问错误页面
 * @Author: qingzi.wang
 * @Date: 2023-05-09 09:20:40
 * @LastEditTime: 2024-01-08 09:59:44
 */
import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError()
  return (
    <div className="d-error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
