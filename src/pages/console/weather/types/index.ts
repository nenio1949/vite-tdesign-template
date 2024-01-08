import { PaginationType } from '@/types'

export interface ListFilterType extends PaginationType {
  name?: string | null
}

/**
 * 天气列表声明
 */
export interface Weather {
  id: number
  name: string
}
