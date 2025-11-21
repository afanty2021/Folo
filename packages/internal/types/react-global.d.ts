/**
 * @fileoverview React 全局类型定义
 * @description 扩展 React 类型系统，添加项目特定的组件类型和属性
 * @author Folo Team
 * @version 1.0.0
 */

import type { FC, PropsWithChildren } from "react"

declare global {
  /**
   * 标准组件类型
   * @description 定义项目中组件的基础类型，包含 className 和 children 等通用属性
   * @template P - 组件的 props 类型
   * @example
   * ```tsx
   * const MyComponent: Component<{ title: string }> = ({ title, className, children }) => {
   *   return <div className={className}>{title}{children}</div>
   * }
   * ```
   */
  export type Component<P = object> = FC<Prettify<ComponentType & P>>

  /**
   * 带引用的组件类型
   * @description 定义支持 ref 传递的组件类型
   * @template P - 组件的 props 类型
   * @template Ref - ref 引用的类型
   */
  export type ComponentWithRef<P = object, Ref = object> = FC<ComponentWithRefType<P, Ref>>

  /**
   * 带引用的组件内部类型
   * @description 结合组件类型和 ref 属性的类型定义
   */
  export type ComponentWithRefType<P = object, Ref = object> = Prettify<
    ComponentType<P> & {
      ref?: React.Ref<Ref>
    }
  >

  /**
   * 基础组件类型
   * @description 定义所有组件共享的基础属性，包括 className 和 children
   * @template P - 组件特有的 props 类型
   */
  export type ComponentType<P = object> = {
    className?: string  // CSS 类名，用于样式定制
  } & PropsWithChildren & // React 的 children 属性类型
    P  // 组件特有的属性类型

  /**
   * Tailwind CSS 样式宏函数
   * @description 这是一个编译时宏，在构建阶段会被替换为实际的 Tailwind CSS 类名
   * 提供类型安全的 CSS-in-JS 写法，同时保持 Tailwind 的性能优势
   *
   * @param strings - 模板字符串数组
   * @param values - 模板字符串中的值
   * @returns 编译后的 CSS 类名字符串
   *
   * @example
   * ```tsx
   * const styles = tw`flex items-center justify-center p-4`
   * // 编译后: "flex items-center justify-center p-4"
   *
   * const dynamicStyles = tw`bg-${color}-500 text-white`
   * // 支持动态类名，但仍会进行类型检查
   * ```
   */
  export function tw(strings: TemplateStringsArray, ...values: any[]): string
}

/**
 * React 模块类型扩展
 * @description 扩展 React 的 AriaAttributes 接口，添加项目特定的 data 属性
 */
declare module "react" {
  export interface AriaAttributes {
    /**
     * 测试标识符
     * @description 用于自动化测试的元素标识符
     * @example
     * ```tsx
     * <button data-testid="submit-button">提交</button>
     * ```
     */
    "data-testid"?: string

    /**
     * 打印时隐藏标识
     * @description 标记在打印页面时应该隐藏的元素
     * @example
     * ```tsx
     * <div data-hide-in-print>仅在屏幕显示</div>
     * ```
     */
    "data-hide-in-print"?: boolean
  }
}

// 使用 export {} 确保这是一个模块文件，避免全局作用域污染
export {}
