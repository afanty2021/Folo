/**
 * @fileoverview 桌面应用主组件
 * @description Folo 桌面应用的主要入口组件，负责应用的初始化、布局和渲染流程
 * @author Folo Team
 * @version 1.0.0
 */

import { isMobile } from "@follow/components/hooks/useMobile.js"
import { IN_ELECTRON } from "@follow/shared/constants"
import { tracker } from "@follow/tracker"
import { nextFrame } from "@follow/utils"
import { cn, getOS } from "@follow/utils/utils"
import { useEffect, useLayoutEffect, useRef } from "react"
import { Outlet } from "react-router"

import { useAppIsReady } from "./atoms/app"
import { useUISettingKey } from "./atoms/settings/ui"
import { applyAfterReadyCallbacks } from "./initialize/queue"
import { removeAppSkeleton } from "./lib/app"
import { ipcServices } from "./lib/client"
import { appLog } from "./lib/log"
import { Titlebar } from "./modules/app/Titlebar"
import { RootProviders } from "./providers/root-providers"

/**
 * 主应用组件
 * @description 桌面应用的根组件，提供整体布局结构
 *
 * 结构说明：
 * 1. Windows 系统下显示自定义标题栏
 * 2. 提供拖拽区域以支持窗口移动
 * 3. 包含应用的核心内容层
 */
function App() {
  // 检测是否为 Windows 系统的 Electron 环境
  const windowsElectron = IN_ELECTRON && getOS() === "Windows"

  return (
    <RootProviders>
      {/* Electron 环境下的标题栏和拖拽区域 */}
      {IN_ELECTRON && (
        <div
          className={cn(
            // 拖拽区域：固定在顶部，全宽，高度为 12 单位
            "drag-region fixed inset-x-0 top-0 h-12 shrink-0",
            // Windows 系统下禁用指针事件，防止拖拽与内容交互冲突
            windowsElectron && "pointer-events-none z-[9999]",
          )}
          aria-hidden  // 隐藏拖拽区域，避免影响辅助功能
        >
          {/* Windows 系统下显示自定义标题栏 */}
          {windowsElectron && <Titlebar />}
        </div>
      )}

      {/* 应用内容层 */}
      <AppLayer />
    </RootProviders>
  )
}

/**
 * 应用内容层组件
 * @description 管理应用的就绪状态和内容渲染，处理初始化流程
 *
 * 功能说明：
 * 1. 监听应用就绪状态，管理骨架屏到实际内容的切换
 * 2. 处理应用初始化完成后的各项清理和回调
 * 3. 在移动端禁用右键菜单，优化用户体验
 */
const AppLayer = () => {
  // 获取应用就绪状态
  const appIsReady = useAppIsReady()

  // 用于确保就绪回调只执行一次的标志
  const onceReady = useRef(false)

  /**
   * 处理应用就绪后的初始化逻辑
   * 使用 useLayoutEffect 确保在浏览器绘制前执行，避免闪烁
   */
  useLayoutEffect(() => {
    if (appIsReady && !onceReady.current) {
      onceReady.current = true

      // 通知主进程窗口可以显示
      ipcServices?.app.readyToShowMainWindow()

      // 下一帧移除骨架屏，确保平滑过渡
      nextFrame(removeAppSkeleton)
    }
  }, [appIsReady])

  /**
   * 应用就绪后的副作用处理
   * 包括性能追踪、日志记录和回调执行
   */
  useEffect(() => {
    // 只有在应用就绪后才执行
    if (!appIsReady) return

    // 记录渲染完成时间用于性能分析
    const doneTime = Math.trunc(performance.now())
    tracker.uiRenderInit(doneTime)
    appLog("App is ready", `${doneTime}ms`)

    // 执行应用就绪后的回调队列
    applyAfterReadyCallbacks()

    // 移动端禁用右键菜单，提供更好的触控体验
    if (isMobile()) {
      const handler = (e: MouseEvent) => {
        e.preventDefault()
      }
      document.addEventListener("contextmenu", handler)

      // 清理函数：移除事件监听器
      return () => {
        document.removeEventListener("contextmenu", handler)
      }
    }
  }, [appIsReady])

  // 根据就绪状态渲染内容或骨架屏
  return appIsReady ? <Outlet /> : <AppSkeleton />
}

/**
 * 应用骨架屏组件
 * @description 在应用加载期间显示的占位界面，提供与实际布局一致的视觉体验
 */
const AppSkeleton = () => {
  // 获取用户设置的侧边栏宽度，确保骨架屏与实际布局一致
  const feedColWidth = useUISettingKey("feedColWidth")

  return (
    <div className="flex size-full">
      {/* 侧边栏骨架：使用与实际组件相同的宽度和样式 */}
      <div
        className="h-full shrink-0 bg-sidebar"  // 使用侧边栏背景色
        style={{
          width: `${feedColWidth}px`,  // 动态宽度，匹配用户设置
        }}
      />
      {/* 主内容区域骨架可以在这里添加 */}
    </div>
  )
}

// 导出为主组件，符合项目的组件命名规范
export { App as Component }
