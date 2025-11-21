/**
 * @fileoverview 前一个值保存 Hook
 * @description 提供保存组件渲染前值的功能，常用于比较新旧值的差异
 * @author Folo Team
 * @version 1.0.0
 */

import { useEffect, useRef } from "react"

/**
 * 保存前一个渲染值的 Hook
 * @description 在组件渲染时保存上一次的值，可以用于比较新旧值的差异
 * @template T - 值的类型
 * @param value - 当前需要保存的值
 * @returns 上一次渲染时的值，第一次调用时返回 undefined
 *
 * 工作原理：
 * 1. 使用 ref 保存值，避免不必要的重新渲染
 * 2. 在 useEffect 中更新 ref 的当前值（在组件渲染后执行）
 * 3. 返回的是更新前的值，即上一次渲染的值
 *
 * @example
 * ```tsx
 * function MyComponent({ count }) {
 *   const prevCount = usePrevious(count)
 *
 *   useEffect(() => {
 *     if (prevCount !== count) {
 *       console.log(`count 从 ${prevCount} 变为 ${count}`)
 *     }
 *   }, [count])
 *
 *   return <div>Count: {count}</div>
 * }
 * ```
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>(undefined) // 使用 ref 存储上一次的值

  // 在每次渲染后执行，将当前值保存到 ref 中
  // 这里使用空依赖数组，确保每次渲染都会执行
  useEffect(() => {
    ref.current = value
  })

  // 返回当前 ref 中的值（即上一次渲染的值）
  return ref.current
}
