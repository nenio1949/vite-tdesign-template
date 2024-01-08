/*
 * @Description: 同步localStroage数据至sessionStroage
 * @Author: qingzi.wang
 * @Date: 2022-12-13 15:28:32
 * @LastEditTime: 2023-04-12 17:28:17
 */

/**
 * 原样值复制，从localStorage到sessionStorage，取值优先从sessionStorage中获取
 */
export async function syncLocalStorageToSessionStorage() {
  const localCounts = localStorage.length

  for (let index = 0; index < localCounts; index++) {
    const thisLocalStorageKey: string = localStorage.key(index) || ''
    const thisLocalStorageValue = localStorage.getItem(thisLocalStorageKey)
    const thisSessionStorageValue = sessionStorage.getItem(thisLocalStorageKey)
    // 仅复制无值情况（对于系统初始情况下，覆盖也可以）
    if (!thisSessionStorageValue && thisLocalStorageValue) {
      sessionStorage.setItem(thisLocalStorageKey, thisLocalStorageValue)
    }
  }
}
