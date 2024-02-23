import React, { useCallback, useState } from 'react'
import { Table, PrimaryTableCol, PrimaryTableCellParams, Drawer } from 'tdesign-react'
// import { PlusIcon } from 'tdesign-icons-react'
import { useQuery } from '@tanstack/react-query'
// import AuthValidator from '@/components/AuthValidator'
import ListFilterUnit from './filter'
// import WeatherCreate from './create'
import operate from '@/utils/operate'
import { shallow } from 'zustand/shallow'
import api from '@/service/api'
import { useFilterStore } from '@/store'
import { ListFilterType, Weather } from './types'

export default function WeatherList() {
  const { listFilter, listFilterSetup: handleListFilterSetup } = useFilterStore(
    useCallback((state) => state, []),
    shallow
  )
  const [condition, setCondition] = useState<ListFilterType>({
    name: null,
    page: 1,
    size: 10,
    ...listFilter.weather
  })
  const [subDrawer, setSubDrawer] = useState<{ visible: boolean; component: React.ReactNode; header: React.ReactNode }>(
    {
      visible: false,
      component: null,
      header: null
    }
  )

  const { isFetching, refetch, data } = useQuery({
    queryKey: ['getWeathers', condition],
    queryFn: async () => {
      const { errcode, data } = await api.getWeathers(condition)
      if (errcode === 0) {
        return data
      }
    }
  })

  const columns: PrimaryTableCol<Weather>[] = [
    {
      colKey: 'index',
      width: 80,
      title: '序号',
      fixed: 'left',
      cell: ({ rowIndex }: PrimaryTableCellParams<Weather>) => handleTableIndex(rowIndex)
    },
    {
      colKey: 'name',
      title: '名称'
    }
  ]

  // 表格分页序号处理
  const handleTableIndex = (index: number) => {
    if (condition.page && condition.size) {
      return `${(condition.page - 1) * condition.size + (index + 1)}`
    }
  }

  /**
   * 操作
   * @param type create 创建
   */
  // const handleOperate = async (type: 'create') => {
  //   switch (type) {
  //     case 'create':
  //       setSubDrawer({ visible: true, header: '新增天气', component: <WeatherCreate onCallback={handleCloseDrawer} /> })
  //       break
  //   }
  // }

  /**
   * 关闭抽屉
   * @param refresh 是否刷新列表
   */
  const handleCloseDrawer = (refresh?: boolean) => {
    if (refresh) {
      refetch()
    }
    setSubDrawer({ visible: false, header: '', component: null })
  }

  /**
   * 筛选
   * @param values 筛选项
   */
  const handleFilter = (values: ListFilterType) => {
    const newCondition = { ...condition, ...values, page: 1 }
    setCondition(newCondition)
    handleListFilterSetup({ weather: newCondition })
    if (condition && !operate.handleShallowEqual(newCondition, condition)) {
      refetch()
    }
  }

  /**
   * 分页变化
   * @param page 当前页码
   * @param size 每页条数
   */
  const handlePaginationChange = (page: number, size: number) => {
    const newCondition = { ...condition, page, size }
    setCondition(newCondition)
    handleListFilterSetup({ faultHand: newCondition })
  }

  return (
    <>
      <ListFilterUnit
        onFilter={handleFilter}
        // extraContent={
        //   <AuthValidator module="/console/weather" type="button" operate="create">
        //     <Button icon={<PlusIcon />} theme="primary" onClick={() => handleOperate('create')}>
        //       创建
        //     </Button>
        //   </AuthValidator>
        // }
      />

      <Table
        rowKey="id"
        bordered
        resizable
        tableLayout="fixed"
        loading={isFetching}
        data={data?.data || []}
        columns={columns}
        pagination={{
          current: condition.page,
          pageSize: condition.size,
          total: data?.nums || 0,
          showJumper: true,
          onChange(pageInfo) {
            handlePaginationChange(pageInfo.current, pageInfo.pageSize)
          }
        }}
      />
      <Drawer
        footer={false}
        visible={subDrawer.visible}
        size="500px"
        header={subDrawer.header}
        onClose={() => handleCloseDrawer()}
      >
        {subDrawer.component}
      </Drawer>
    </>
  )
}
