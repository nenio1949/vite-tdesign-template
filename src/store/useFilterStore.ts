/*
 * @Description: 列表筛选状态管理
 * @Author: yong.li
 * @Date: 2023-10-25 13:30:51
 * @LastEditors: yong.li
 * @LastEditTime: 2024-01-08 10:00:47
 */
import { createWithEqualityFn } from 'zustand/traditional'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ListFilterType = { [key in string]: any }

interface IFilterState {
  /**
   * 列表筛选值
   */
  listFilter: ListFilterType
  /**
   * 设置列表筛选值
   * @param value {module: condition} module 模块名，注意不要重复；condition 筛选条件
   * @returns
   */
  listFilterSetup: (value: ListFilterType) => void
}

const useFilterStore = createWithEqualityFn<IFilterState>(
  (set) => ({
    listFilter: {},
    /**
     * 设置列表筛选值
     * @param listFilter
     * @returns
     */
    listFilterSetup: (value: ListFilterType) =>
      set((state) => {
        return { listFilter: { ...state.listFilter, ...value } }
      })
  }),
  Object.is
)

export default useFilterStore
