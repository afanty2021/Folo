/**
 * @fileoverview 主题相关 React Hooks
 * @description 提供深色模式检测和主题状态管理相关的自定义 Hooks
 * @author Folo Team
 * @version 1.0.0
 */

import { useAtomValue } from "jotai"

import { themeAtom, useDarkQuery } from "./internal/for-theme"

/**
 * Web 应用深色模式 Hook
 * @description 根据用户设置和系统偏好判断是否应该使用深色模式
 * @returns 如果应该使用深色模式返回 true，否则返回 false
 *
 * 判断逻辑：
 * 1. 如果用户明确设置为深色模式，返回 true
 * 2. 如果用户设置为跟随系统，则根据系统深色模式设置决定
 * 3. 否则返回 false（浅色模式）
 */
function useDarkWebApp() {
  const systemIsDark = useDarkQuery()  // 获取系统深色模式状态
  const mode = useAtomValue(themeAtom) // 获取用户主题设置

  // 根据主题模式设置返回是否使用深色
  return mode === "dark" || (mode === "system" && systemIsDark)
}

/**
 * 深色模式检测 Hook
 * @description 判断当前应用是否应该使用深色模式的别名
 * @returns 深色模式状态布尔值
 */
export const useIsDark = useDarkWebApp

/**
 * 主题设置值 Hook
 * @description 获取当前的主题模式设置值
 * @returns 当前主题模式："light" | "dark" | "system"
 */
export const useThemeAtomValue = () => useAtomValue(themeAtom)

// 导出类型定义和其他主题相关函数
export type { ColorMode } from "./internal/for-theme"
export { useDarkQuery } from "./internal/for-theme"
