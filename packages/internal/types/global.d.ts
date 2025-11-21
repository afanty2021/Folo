/**
 * @fileoverview 全局 TypeScript 类型定义
 * @description 提供项目中常用的全局类型工具和辅助类型
 * @author Folo Team
 * @version 1.0.0
 */

declare global {
  /**
   * 可空类型
   * @description 表示值可以是 T 类型、null 或 undefined
   * @template T - 原始类型
   * @example
   * ```ts
   * type Name = Nullable<string> // string | null | undefined
   * ```
   */
  export type Nullable<T> = T | null | undefined

  /**
   * 判断是否为字面量字符串类型
   * @description 如果 T 是字符串字面量类型（如 "hello"），则返回 T，否则返回 never
   * @template T - 要检查的类型
   * @example
   * ```ts
   * type LiteralStr = IsLiteralString<"hello"> // "hello"
   * type GeneralStr = IsLiteralString<string> // never
   * ```
   */
  type IsLiteralString<T> = T extends string ? (string extends T ? never : T) : never

  /**
   * 提取字符串类型（递归处理数组）
   * @description 从类型或数组类型中提取字符串类型
   * @template T - 要处理的类型
   */
  type OmitStringType<T> = T extends any[] ? OmitStringType<T[number]> : IsLiteralString<T>

  /**
   * 移除 undefined 类型
   * @description 递归地移除对象类型中的 undefined 属性
   * @template T - 要处理的类型
   * @example
   * ```ts
   * type Result = NonUndefined<{ a: string; b?: undefined; c: number }>
   * // 结果: { a: string; c: number }
   * ```
   */
  type NonUndefined<T> = T extends undefined
    ? never
    : T extends object
      ? { [K in keyof T]: NonUndefined<T[K]> }
      : T

  /**
   * 空值类型定义
   * @description 表示各种形式的空值或假值
   * @example
   * ```ts
   * const check = (value: NilValue) => {
   *   return value === null || value === undefined || value === false || value === ""
   * }
   * ```
   */
  type NilValue = null | undefined | false | ""

  /**
   * 美化类型定义
   * @description 用于处理复杂的类型计算，使类型显示更清晰
   * 主要作用是将交叉类型转换为对象类型，提升类型提示的可读性
   * @template T - 要美化的类型
   * @example
   * ```ts
   * // 复杂类型可能会显示为 { a: string } & { b: number }
   * // 使用 Prettify 后显示为 { a: string; b: number }
   * type CleanType = Prettify<{ a: string } & { b: number }>
   * ```
   */
  type Prettify<T> = {
    [K in keyof T]: T[K]
  } & {}
}

// 使用 export {} 确保这是一个模块文件，避免全局作用域污染
export {}
