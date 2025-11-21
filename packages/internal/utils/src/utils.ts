/**
 * @fileoverview Folo 项目核心工具函数库
 * @description 提供项目常用的工具函数，包括样式处理、平台检测、数据格式化等
 * @author Folo Team
 * @version 1.0.0
 */

import { WEB_BUILD } from "@follow/shared/constants"
import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import dayjs from "dayjs"
import { extendTailwindMerge } from "tailwind-merge"
import { parse } from "tldts"

import { replaceImgUrlIfNeed } from "./img-proxy"

// 可空类型定义，表示值可以是 T 类型、null 或 undefined
type Nullable<T> = T | null | undefined

/**
 * 扩展的 Tailwind CSS 合并器配置
 * @description 自定义文本样式主题，支持 iOS 风格的文字大小层级
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "largeTitle",   // 大标题 - 34pt
        "title1",       // 一级标题 - 28pt
        "title2",       // 二级标题 - 22pt
        "title3",       // 三级标题 - 20pt
        "headline",     // 标题 - 17pt
        "body",         // 正文 - 17pt
        "callout",      // 说明文字 - 16pt
        "subheadline",  // 副标题 - 15pt
        "footnote",     // 脚注 - 13pt
        "caption",      // 标注 - 12pt
      ],
    },
  },
})

/**
 * 样式类名合并函数
 * @description 结合 clsx 和 tailwind-merge，智能合并和去重 CSS 类名
 * @param inputs - 可变的类名输入，可以是字符串、对象、数组等
 * @returns 合并后的最终类名字符串
 * @example
 * ```tsx
 * cn("px-4 py-2", "bg-blue-500", isActive && "bg-red-500")
 * // 返回: "px-4 py-2 bg-red-500" (自动去重覆盖)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export { clsx } from "clsx"

/**
 * 操作系统类型定义
 * @description 支持的所有操作系统类型枚举
 */
export type OS = "macOS" | "iOS" | "Windows" | "Android" | "Linux" | ""

// 全局类型声明，用于 Electron 环境下的平台检测
declare const window: {
  platform: NodeJS.Platform  // Node.js 平台标识符
  navigator: Navigator      // 浏览器导航器对象
}

// Electron 环境标识常量
declare const ELECTRON: boolean

/**
 * 单次执行函数包装器
 * @description 确保函数只在第一次调用时执行，后续调用返回缓存的结果
 * @template T - 函数返回值类型
 * @param fn - 需要包装的函数
 * @returns 包装后的函数，第一次执行后返回缓存值
 * @example
 * ```ts
 * const expensiveCalculation = once(() => {
 *   return computeExpensiveResult()
 * })
 *
 * expensiveCalculation() // 第一次执行计算
 * expensiveCalculation() // 后续调用返回缓存结果
 * ```
 */
export const once = <T>(fn: () => T): (() => T) => {
  let first = true
  let value: T

  return () => {
    if (first) {
      first = false
      value = fn()
      return value
    }
    return value
  }
}

/**
 * 获取当前操作系统类型（带缓存）
 * @description 通过多种方式检测用户操作系统，包括平台标识和用户代理字符串
 * @returns 当前操作系统类型字符串
 * @example
 * ```ts
 * const os = getOS()
 * if (os === "macOS") {
 *   console.log("运行在 macOS 上")
 * }
 * ```
 */
export const getOS = once((): OS => {
  // 优先使用 Node.js 的平台标识符（Electron 环境）
  if (window.platform) {
    switch (window.platform) {
      case "darwin": {
        return "macOS"
      }
      case "win32": {
        return "Windows"
      }
      case "linux": {
        return "Linux"
      }
    }
  }

  // 浏览器环境下的平台检测配置
  const { userAgent } = window.navigator
  const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"]
  const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"]
  const iosPlatforms = ["iPhone", "iPad", "iPod"]

  // 获取平台信息（优先使用新的 userAgentData API）
  // @ts-expect-error userAgentData 是较新的 API
  const platform = window.navigator.userAgentData?.platform || window.navigator.platform
  let os = platform

  // 根据平台特征判断操作系统
  if (macosPlatforms.includes(platform)) {
    os = "macOS"
  } else if (iosPlatforms.includes(platform)) {
    os = "iOS"
  } else if (windowsPlatforms.includes(platform)) {
    os = "Windows"
  } else if (/Android/.test(userAgent)) {
    os = "Android"
  } else if (!os && /Linux/.test(platform)) {
    os = "Linux"
  }

  return os as OS
})

/**
 * 检测当前浏览器类型
 * @description 通过解析 User-Agent 字符串识别用户使用的浏览器
 * @returns 浏览器名称字符串
 * @example
 * ```ts
 * const browser = detectBrowser()
 * if (browser === "Chrome") {
 *   console.log("使用 Chrome 浏览器")
 * }
 * ```
 */
export function detectBrowser() {
  const { userAgent } = navigator

  // 按优先级顺序检测各种浏览器
  if (userAgent.includes("Edg")) {
    return "Microsoft Edge"
  } else if (userAgent.includes("Chrome")) {
    return "Chrome"
  } else if (userAgent.includes("Firefox")) {
    return "Firefox"
  } else if (userAgent.includes("Safari")) {
    return "Safari"
  } else if (userAgent.includes("Opera")) {
    return "Opera"
  } else if (userAgent.includes("Trident") || userAgent.includes("MSIE")) {
    return "Internet Explorer"
  }

  return "Unknown"
}

/**
 * 检测是否为 Safari 浏览器（带缓存）
 * @description 专门检测 Safari，排除 Chrome（Chrome 也包含 Safari/AppleWebKit 标识）
 * @returns 如果是 Safari 浏览器返回 true，否则返回 false
 * @note Electron 环境下始终返回 false
 */
export const isSafari = once(() => {
  if (ELECTRON) return false
  const ua = window.navigator.userAgent
  // Safari 包含 Safari 或 AppleWebKit，但不包含 Chrome
  return (ua.includes("Safari") || ua.includes("AppleWebKit")) && !ua.includes("Chrome")
})

/**
 * 检查字符串是否为纯 ASCII 字符
 * @description 判断字符串是否只包含 ASCII 字符（0-127 范围）
 * @param str - 要检查的字符串
 * @returns 如果是纯 ASCII 字符返回 true，否则返回 false
 */
// eslint-disable-next-line no-control-regex
export const isASCII = (str: string) => /^[\u0000-\u007F]*$/.test(str)

/**
 * 雪花算法时间戳基准点
 * @description 基于 Folo 仓库创建时间的毫秒时间戳
 * 用于雪花 ID 的解码和验证
 */
const EPOCH = 1712546615000n // follow repo created

/**
 * 时间戳最大位数
 * @description 雪花算法中时间戳部分的最大位数（通常使用 41 位）
 */
const MAX_TIMESTAMP_BITS = 41n // Maximum number of bits typically used for timestamp

/**
 * 业务 ID 类型守卫函数
 * @description 验证 ID 是否为有效的雪花算法业务 ID
 * @param id - 要验证的 ID 字符串
 * @returns 如果是有效的业务 ID 返回 true，否则返回 false
 */
export function isBizId(id: string): boolean

/**
 * 业务 ID 类型守卫函数（可空版本）
 * @description 验证 ID 是否为有效的雪花算法业务 ID，支持 undefined 输入
 * @param id - 要验证的 ID 字符串或 undefined
 * @returns 如果是有效的业务 ID 返回 true，否则返回 false
 */
export function isBizId(id: string | undefined): id is string

export function isBizId(id: string | undefined): id is string {
  // 基本格式检查：必须是 13-19 位数字
  if (!id || !/^\d{13,19}$/.test(id)) return false

  const snowflake = BigInt(id)

  // 从雪花 ID 中提取时间戳（假设时间戳在最高位，去掉符号位）
  const timestamp = (snowflake >> (63n - MAX_TIMESTAMP_BITS)) + EPOCH
  const date = new Date(Number(timestamp))

  // 检查时间戳是否合理（2024-2050 年之间）
  if (date.getFullYear() >= 2024 && date.getFullYear() <= 2050) {
    // 额外验证：检查 ID 不超过最大可能值
    const maxPossibleId = (1n << 63n) - 1n // 最大可能的 63 位值
    if (snowflake <= maxPossibleId) {
      return true
    }
  }

  return false
}

/**
 * 格式化 XML 字符串
 * @description 将压缩的 XML 字符串格式化为易读的缩进格式
 * @param xml - 要格式化的 XML 字符串
 * @param indent - 缩进空格数，默认为 4
 * @returns 格式化后的 XML 字符串
 * @example
 * ```ts
 * const xml = "<root><child>content</child></root>"
 * const formatted = formatXml(xml)
 * // 返回:
 * // <root>
 * //     <child>content</child>
 * // </root>
 * ```
 */
export function formatXml(xml: string, indent = 4) {
  const PADDING = " ".repeat(indent)
  let formatted = ""

  // 在标签之间添加换行符
  const regex = /(>)(<)(\/*)/g
  const xmlStr = xml.replaceAll(regex, "$1\r\n$2$3")
  let pad = 0

  xmlStr.split("\r\n").forEach((node) => {
    let indent = 0

    // 处理自闭合标签和普通标签的不同缩进情况
    if (/.+<\/\w[^>]*>$/.test(node)) {
      // 自闭合标签，不改变缩进
      indent = 0
    } else if (/^<\/\w/.test(node) && pad !== 0) {
      // 闭合标签，减少缩进
      pad -= 1
    } else if (/^<\w(?:[^>]*[^/])?>.*$/.test(node)) {
      // 开始标签，增加缩进
      indent = 1
    } else {
      // 其他情况（如文本内容），不改变缩进
      indent = 0
    }

    formatted += `${PADDING.repeat(pad) + node}\r\n`
    pad += indent
  })

  return formatted.trim()
}

/**
 * 异步睡眠函数
 * @description 暂停执行指定毫秒数
 * @param ms - 要睡眠的毫秒数
 * @returns Promise，在指定时间后解析
 * @example
 * ```ts
 * await sleep(1000) // 暂停 1 秒
 * console.log("1秒后执行")
 * ```
 */
export const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

/**
 * 首字母大写转换
 * @description 将字符串的首字母转换为大写，其余字母保持不变
 * @param string - 要处理的字符串
 * @returns 首字母大写的字符串
 * @example
 * ```ts
 * capitalizeFirstLetter("hello") // "Hello"
 * capitalizeFirstLetter("WORLD") // "WORLD"
 * ```
 */
export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1)

/**
 * 移除对象中值为 undefined 的属性
 * @description 创建一个新对象，移除所有值为 undefined 的属性
 * @param obj - 要处理的对象
 * @returns 移除了 undefined 属性的新对象
 * @example
 * ```ts
 * const obj = { a: 1, b: undefined, c: "test" }
 * const cleanObj = omitObjectUndefinedValue(obj)
 * // 结果: { a: 1, c: "test" }
 * ```
 */
export const omitObjectUndefinedValue = (obj: Record<string, any>) => {
  const newObj = {} as any
  for (const key in obj) {
    if (obj[key] !== undefined) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}

/**
 * 字母排序函数（支持中英文混合）
 * @description 实现智能排序：英文字母优先，然后是中文字符
 * @param a - 第一个字符串
 * @param b - 第二个字符串
 * @returns 排序比较结果：负数表示 a < b，正数表示 a > b，0 表示相等
 * @example
 * ```ts
 * const arr = ["中文", "Apple", "香蕉", "Banana"]
 * arr.sort(sortByAlphabet)
 * // 结果: ["Apple", "Banana", "中文", "香蕉"]
 * ```
 */
export const sortByAlphabet = (a: string, b: string) => {
  const isALetter = /^[a-z]/i.test(a)  // 检查 a 是否以英文字母开头
  const isBLetter = /^[a-z]/i.test(b)  // 检查 b 是否以英文字母开头

  // 英文字母优先于中文字符
  if (isALetter && !isBLetter) {
    return -1  // a 排在前面
  }
  if (!isALetter && isBLetter) {
    return 1   // b 排在前面
  }

  // 两个都是英文字符，使用默认本地化比较
  if (isALetter && isBLetter) {
    return a.localeCompare(b)
  }

  // 两个都是中文字符，使用中文本地化比较
  return a.localeCompare(b, "zh-CN")
}

/**
 * 检查对象是否为空
 * @description 判断对象是否没有任何可枚举属性
 * @param obj - 要检查的对象
 * @returns 如果对象为空返回 true，否则返回 false
 * @example
 * ```ts
 * isEmptyObject({})           // true
 * isEmptyObject({ a: 1 })      // false
 * isEmptyObject({ a: undefined }) // false
 * ```
 */
export const isEmptyObject = (obj: Record<string, any>) => Object.keys(obj).length === 0

/**
 * 安全解析 URL
 * @description 尝试解析 URL，如果解析失败则返回 null
 * @param url - 要解析的 URL 字符串
 * @returns URL 对象或 null
 * @example
 * ```ts
 * parseSafeUrl("https://example.com")   // URL 对象
 * parseSafeUrl("invalid-url")          // null
 * ```
 */
export const parseSafeUrl = (url: string) => {
  try {
    return new URL(url)
  } catch {
    return null
  }
}

/**
 * 基于基础 URL 解析相对 URL（已废弃）
 * @description 将相对 URL 解析为绝对 URL
 * @deprecated 将来会移除，请使用其他替代方案
 * @param url - 要解析的相对 URL
 * @param baseUrl - 基础 URL
 * @returns 解析后的绝对 URL 或原始 URL
 */
export const resolveUrlWithBase = (url: string, baseUrl: string) => {
  try {
    return new URL(url, baseUrl).href
  } catch {
    return url
  }
}

export const getUrlIcon = (url: string, fallback?: boolean | undefined) => {
  let src: string
  let fallbackUrl = ""

  try {
    const { host } = new URL(url)
    const pureDomain = parse(host).domainWithoutSuffix
    fallbackUrl = `https://avatar.vercel.sh/${pureDomain}.svg?text=${pureDomain
      ?.slice(0, 2)
      .toUpperCase()}`
    src = `https://unavatar.webp.se/${host}?fallback=${fallback || false}`
  } catch {
    const pureDomain = parse(url).domainWithoutSuffix
    src = `https://avatar.vercel.sh/${pureDomain}.svg?text=${pureDomain?.slice(0, 2).toUpperCase()}`
  }
  const ret = {
    src,
    fallbackUrl,
  }

  return ret
}

export const getAvatarUrl = (user?: {
  email?: string | null
  name?: string | null
  handle?: string | null
  image?: string | null
}) => {
  if (user) {
    if (user?.image) {
      return replaceImgUrlIfNeed({
        url: user.image,
        inBrowser: WEB_BUILD,
      })
    } else {
      const fallbackUrl = `https://avatar.vercel.sh/${user.handle || user.name}.svg?text=${(user.handle || user.name)?.slice(0, 2).toUpperCase()}`
      return `https://unavatar.webp.se/gravatar/${user.email}?fallback=${encodeURIComponent(fallbackUrl)}`
    }
  } else {
    return `https://avatar.vercel.sh/folo`
  }
}

export { parse as parseUrl } from "tldts"

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

export function shallowCopy<T>(input: T): T {
  if (Array.isArray(input)) {
    return [...input] as T
  } else if (input && typeof input === "object") {
    return { ...input } as T
  }
  return input
}

export function isKeyForMultiSelectPressed(e: MouseEvent) {
  if (getOS() === "macOS") {
    return e.metaKey || e.shiftKey
  }
  return e.ctrlKey || e.shiftKey
}

export const toScientificNotation = (
  num: readonly [bigint, number] | bigint,
  threshold: number,
  locale?: Intl.Locale | string,
) => {
  // Handle string input by converting to dnum format
  let value: bigint
  let decimals: number

  if (typeof num === "bigint") {
    decimals = 0
    value = num
  } else {
    // Extract number from dnum tuple
    ;[value, decimals] = num
  }

  // Convert to decimal string representation
  const valueAsString = value.toString()

  // Handle zero case
  if (valueAsString === "0") return "0"

  // Determine length of the integer part
  const integerLength = valueAsString.length > decimals ? valueAsString.length - decimals : 0

  // Return normal formatted number if below threshold
  if (integerLength <= threshold) {
    // Use provided locale or default to en-US
    const localeString = locale?.toString() || "en-US"
    const formatter = new Intl.NumberFormat(localeString, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })

    // Convert bigint to number with correct decimal places
    const asNumber = Number(value) / Math.pow(10, decimals)
    return formatter.format(asNumber)
  }

  // Format in scientific notation
  // Insert decimal point at appropriate place
  let normalizedNumStr = valueAsString
  if (valueAsString.length <= decimals) {
    // Need to pad with leading zeros
    normalizedNumStr = "0".repeat(decimals - valueAsString.length + 1) + valueAsString
  }

  // Find first non-zero digit
  const firstNonZeroIndex = normalizedNumStr.search(/[1-9]/)
  if (firstNonZeroIndex === -1) return "0" // All zeros

  // Get first digits for the significand
  const significandDigits = normalizedNumStr.slice(
    firstNonZeroIndex,
    Math.min(firstNonZeroIndex + 3, normalizedNumStr.length),
  )

  // Calculate exponent
  const exponent = integerLength - 1

  // Format significand according to locale
  const localeString = locale?.toString() || "en-US"
  const formatter = new Intl.NumberFormat(localeString, {
    maximumFractionDigits: significandDigits.length - 1,
  })

  // Create significand as a properly formatted decimal
  const firstDigit = Number(significandDigits[0])
  const remainingDigits = significandDigits.slice(1)
  const significandNumber = Number(`${firstDigit}.${remainingDigits}`)
  const formattedSignificand = formatter.format(significandNumber)

  // Format the exponent marker according to locale
  // Many locales use "×10^" notation instead of "e+"
  const useENotation = localeString.startsWith("en")

  if (useENotation) {
    return `${formattedSignificand}e+${exponent}`
  } else {
    return `${formattedSignificand}×10^${exponent}`
  }
}

export function transformShortcut(shortcut: string, platform: OS = getOS()): string {
  if (platform === "macOS") {
    return shortcut.replace("$mod", "Meta")
  }
  return shortcut.replace("$mod", "Control")
}

const F_KEY_REGEX = /^F(?:[1-9]|1[0-2])$/

function getKeySortValue(key: string): number {
  const order = ["Shift", "Control", "Meta", "Alt"]

  if (order.includes(key)) {
    return order.indexOf(key)
  }

  if (F_KEY_REGEX.test(key)) return 4
  return 5
}

export function sortShortcutKeys(keys: string[]): string[] {
  return [...keys].sort((a, b) => {
    const sortValueA = getKeySortValue(a)
    const sortValueB = getKeySortValue(b)
    if (sortValueA !== sortValueB) {
      return sortValueA - sortValueB
    }

    return a.localeCompare(b)
  })
}

// time like 1:30:00
export const formatTimeToSeconds = (time?: string | number) => {
  if (typeof time === "number" || time === undefined) {
    return time
  }

  const formats = ["h:mm:ss", "mm:ss", "m:ss"]

  for (const format of formats) {
    const date = dayjs(time, format)
    if (date.isValid()) {
      const totalSeconds = date.hour() * 3600 + date.minute() * 60 + date.second()
      return totalSeconds
    }
  }
}

/**
 * @example
 * ```ts
 * timeStringToSeconds("1:30") // 90
 * timeStringToSeconds("1:30:00") // 5400
 * ```
 */
export function timeStringToSeconds(time: string): number | null {
  const timeParts = time.split(":").map(Number)

  if (timeParts.length === 2) {
    const [minutes, seconds] = timeParts
    return minutes! * 60 + seconds!
  } else if (timeParts.length === 3) {
    const [hours, minutes, seconds] = timeParts
    return hours! * 3600 + minutes! * 60 + seconds!
  } else {
    return null
  }
}

export const formatEstimatedMins = (estimatedMins: number) => {
  const minutesInHour = 60
  const minutesInDay = minutesInHour * 24
  const minutesInMonth = minutesInDay * 30

  const months = Math.floor(estimatedMins / minutesInMonth)
  const days = Math.floor((estimatedMins % minutesInMonth) / minutesInDay)
  const hours = Math.floor((estimatedMins % minutesInDay) / minutesInHour)
  const minutes = estimatedMins % minutesInHour

  if (months > 0) {
    return `${months}M ${days}d`
  }
  if (days > 0) {
    return `${days}d ${hours}h`
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${estimatedMins} mins`
}

export const omitShallow = (obj: any, ...keys: string[]) => {
  if (!obj) return obj
  if (typeof obj !== "object") return obj
  if (Array.isArray(obj)) return obj

  const nextObj = { ...obj }
  for (const key of keys) {
    Reflect.deleteProperty(nextObj, key)
  }
  return nextObj
}

export function duplicateIfLengthLessThan(text: string, length: number) {
  return text.length > 0 && text.length < length
    ? text.repeat(Math.ceil(length / text.length))
    : text
}

export function combineCleanupFunctions(...fns: Array<Nullable<(() => void) | void>>) {
  return () => {
    fns.forEach((fn) => {
      if (typeof fn === "function") {
        fn()
      }
    })
  }
}

export function doesTextContainHTML(text?: string | null): boolean {
  if (!text) return false
  return /<([a-z][a-z0-9]*)\b[^>]*>\s*[^<>\s].*<\/\1>/i.test(text)
}

/**
 * Format number to a more readable format
 * @param num - The number to format
 * @returns The formatted number
 */
export function formatNumber(num: number): string {
  // Handle negative numbers
  const isNegative = num < 0
  const absNum = Math.abs(num)

  // Define thresholds
  const billion = 1_000_000_000
  const million = 1_000_000
  const thousand = 1_000

  // Format based on number size
  if (absNum >= billion) {
    return `${isNegative ? "-" : ""}${(absNum / billion).toFixed(1)}B`
  } else if (absNum >= million) {
    return `${isNegative ? "-" : ""}${(absNum / million).toFixed(1)}M`
  } else if (absNum >= thousand) {
    return `${isNegative ? "-" : ""}${(absNum / thousand).toFixed(1)}K`
  }

  return `${isNegative ? "-" : ""}${absNum}`
}

export type MobilePlatform = "iOS" | "Android" | null

export const getMobilePlatform = once((): MobilePlatform => {
  const os = getOS()

  return ["iOS", "Android"].includes(os) ? (os as MobilePlatform) : null
})

export const isMobileDevice = once((): boolean => {
  return getMobilePlatform() !== null
})

export function getDateISOString(dateOrDateString: Date | string | null): string | null {
  if (!dateOrDateString) return null
  if (typeof dateOrDateString === "string") {
    return dateOrDateString
  }
  return dateOrDateString.toISOString()
}
