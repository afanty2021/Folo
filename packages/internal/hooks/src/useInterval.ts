/**
 * @fileoverview 高精度定时器 Hook
 * @description 提供带时间补偿的高精度定时器，避免传统 setInterval 的累积误差
 * @author Folo Team
 * @version 1.0.0
 */

import { useEffect, useRef } from "react"
import { useIsomorphicLayoutEffect } from "usehooks-ts"

interface AccurateIntervalOptions {
  delay: number           // 延迟时间（毫秒）
  enable?: boolean       // 是否启用定时器，默认 true
  immediately?: boolean  // 是否立即执行第一次，默认 true
}

/**
 * 高精度定时器 Hook
 * @description 提供带时间补偿的定时器，解决传统 setInterval 的误差累积问题
 * @param callback - 定时执行的回调函数
 * @param options - 定时器配置选项
 *
 * 特性：
 * 1. 时间补偿：每次执行时计算实际延迟，补偿任务执行时间
 * 2. 高精度：避免 setInterval 的累积误差
 * 3. 灵活控制：支持启用/禁用、延迟首次执行等
 *
 * @example
 * ```tsx
 * useAccurateInterval(() => {
 *   console.log('每秒执行一次，保持精确间隔')
 * }, {
 *   delay: 1000,
 *   enable: true,
 *   immediately: false // 延迟 1 秒后开始
 * })
 * ```
 */
export function useAccurateInterval(
  callback: () => void,
  options: AccurateIntervalOptions,
) {
  const { delay, enable = true, immediately = true } = options

  // 保存最新的回调函数引用
  const savedCallback = useRef(callback)
  // 下一次触发的时间点
  const nextTick = useRef(Date.now() + (delay || 0))
  // 触发次数计数器（用于控制是否立即执行）
  const triggerCountRef = useRef(0)
  // 定时器引用
  const timerRef = useRef<any | null | undefined>(null)

  // 在每次重渲染时更新回调函数引用
  // 使用 useIsomorphicLayoutEffect 确保在服务端和客户端都能正常工作
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // 设置和管理定时器
  useEffect(() => {
    // 如果禁用，直接返回
    if (!enable) return

    // 如果没有指定延迟值，不设置定时器
    // 注意：0 是有效的延迟值
    if (!delay && delay !== 0) {
      return
    }

    /**
     * 定时器执行函数
     * 包含时间补偿逻辑，确保执行间隔的准确性
     */
    function tick() {
      // 控制是否立即执行：首次执行根据 immediately 参数，后续总是执行
      if (immediately || triggerCountRef.current > 0) {
        savedCallback.current()
      }
      triggerCountRef.current++

      const now = Date.now()
      const expectedNextTick = nextTick.current
      // 计算实际延迟，考虑任务执行时间
      const actualDelay = Math.max(0, expectedNextTick - now)

      // 计算下一次触发的时间，包含补偿时间
      nextTick.current = now + delay + actualDelay
      timerRef.current = setTimeout(tick, nextTick.current - now)
    }

    // 启动定时器
    tick()

    // 清理函数：重置状态并清除定时器
    return () => {
      nextTick.current = Date.now() // 重置时间戳，为下次运行做准备
      timerRef.current = clearTimeout(timerRef.current)
    }
  }, [delay, enable, immediately])
}
