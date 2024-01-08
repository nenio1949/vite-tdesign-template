import { Button, Form, Input, Space, SubmitContext } from 'tdesign-react'
import { ListFilterType } from './types'

const { FormItem } = Form

interface IListFilterUnitPorps {
  onFilter: (values: ListFilterType) => void
  extraContent?: React.ReactNode
}

/**
 * 列表筛选
 */
export default function ListFilterUnit({ onFilter, extraContent }: IListFilterUnitPorps) {
  const [form] = Form.useForm()

  /**
   * 提交筛选条件
   * @param values 条件对象值
   */
  const handleSubmit = (context: SubmitContext) => {
    if (context.validateResult === true) {
      const values = context.fields
      onFilter(values)
    }
  }

  /**
   * 重置筛选条件
   */
  const handleReset = () => {
    const formValues = form.getFieldsValue(true)
    onFilter(formValues as ListFilterType)
  }

  return (
    <>
      <div className="d-content-filter">
        <Form layout="inline" form={form} onSubmit={handleSubmit} onReset={handleReset}>
          <FormItem name="name" label="名称">
            <Input clearable maxlength={50} placeholder="请输入名称" />
          </FormItem>
          <FormItem>
            <Space>
              <Button type="submit" theme="primary">
                查询
              </Button>
              <Button type="reset" theme="default">
                重置
              </Button>
              {extraContent}
            </Space>
          </FormItem>
        </Form>
      </div>
    </>
  )
}
