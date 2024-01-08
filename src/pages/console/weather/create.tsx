import { Button, Form, Input, Loading, Space, SubmitContext } from 'tdesign-react'
import api from '@/service/api'
import { useState } from 'react'

const { FormItem } = Form

interface IProps {
  /** 回调方法 */
  onCallback: (refresh?: boolean) => void
}

export default function WeatherCreate({ onCallback }: IProps) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  /**
   * 提交
   * @param context
   */
  const handleSubmit = async (context: SubmitContext) => {
    if (context.validateResult === true) {
      const values = context.fields
      setLoading(true)
      const { errcode } = await api.createWeather(values)
      setLoading(false)
      if (errcode === 0) {
        onCallback(true)
      }
    }
  }

  /**
   * 取消
   */
  const handleClose = () => {
    onCallback()
  }

  return (
    <div className="d-form">
      <Loading loading={loading}>
        <Form form={form} onSubmit={handleSubmit} scrollToFirstError="smooth">
          <div className="d-form-content">
            <FormItem name="name" label="名称" rules={[{ required: true, message: '请输入天气名称！', type: 'error' }]}>
              <Input clearable maxlength={50} placeholder="请输入名称" />
            </FormItem>
          </div>
          <FormItem className="d-form-footer">
            <Space>
              <Button theme="default" onClick={handleClose}>
                取消
              </Button>
              <Button theme="primary" type="submit" loading={loading}>
                提交
              </Button>
            </Space>
          </FormItem>
        </Form>
      </Loading>
    </div>
  )
}
