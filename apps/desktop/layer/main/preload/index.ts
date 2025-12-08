import os from "node:os"
import { platform } from "node:process"

import { electronAPI } from "@electron-toolkit/preload"
import { clipboard, contextBridge } from "electron"

export const isMacOS = platform === "darwin"

export const isWindows = platform === "win32"

export const isLinux = platform === "linux"

/**
 * @see https://learn.microsoft.com/en-us/windows/release-health/windows11-release-information
 * Windows 11 buildNumber starts from 22000.
 */
const detectingWindows11 = () => {
  if (!isWindows) return false

  const release = os.release()
  const majorVersion = Number.parseInt(release.split(".")[0]!)
  const buildNumber = Number.parseInt(release.split(".")[2]!)

  return majorVersion === 10 && buildNumber >= 22000
}

export const isWindows11 = detectingWindows11()

// Custom APIs for renderer - 安全的 API 暴露
const api = {
  canWindowBlur: process.platform === "darwin" || (process.platform === "win32" && isWindows11),
  // 只暴露必要的平台信息，不暴露敏感的系统信息
  platform: process.platform,
}

// 安全的剪贴板 API 包装
const safeClipboardAPI = {
  readText: () => clipboard.readText(),
  writeText: (text: string) => clipboard.writeText(text),
  // 不暴露 readBuffer/writeBuffer 等危险方法
}

// 使用 contextBridge 安全地暴露 APIs 到渲染进程
if (process.contextIsolated) {
  try {
    // 只暴露安全的 electron API
    contextBridge.exposeInMainWorld("electron", {
      ...electronAPI,
      // 覆盖或移除危险的 API
      ipcRenderer: {
        invoke: electronAPI.ipcRenderer?.invoke,
        on: electronAPI.ipcRenderer?.on,
        off: electronAPI.ipcRenderer?.off,
        // 不暴露 sendSync 等同步方法
      },
    })

    contextBridge.exposeInMainWorld("api", api)
    contextBridge.exposeInMainWorld("clipboard", safeClipboardAPI)
  } catch (error) {
    console.error("Failed to expose APIs to renderer:", error)
  }
} else {
  // 如果上下文隔离被禁用（不推荐），记录警告
  console.warn("⚠️ 警告: 上下文隔离被禁用，这存在安全风险！")

  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
  window.clipboard = safeClipboardAPI
}
