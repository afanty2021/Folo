/**
 * @fileoverview 应用全局状态上下文管理
 * @description 提供轻量级的依赖注入系统，管理 API 客户端、认证客户端和查询客户端等全局状态
 * @author Folo Team
 * @version 1.0.0
 */

import type { AuthClient } from "@follow/shared/auth"
import type { QueryClient } from "@tanstack/react-query"

import type { FollowAPI } from "./types"

/**
 * 空值标识符
 * @description 使用 Symbol 确保唯一性，用于表示上下文未设置状态
 */
const NO_VALUE_DEFAULT = Symbol("NO_VALUE_DEFAULT")

/**
 * 上下文值类型定义
 * @description 可以是具体值 T 或空值标识符
 * @template T - 上下文存储的值类型
 */
type ContextValue<T> = T | typeof NO_VALUE_DEFAULT

/**
 * 创建 JavaScript 上下文
 * @description 创建一个轻量级的上下文管理系统，类似 React Context 但更轻量
 *
 * 设计原理：
 * 1. 使用闭包存储状态，避免 React Context 的重渲染问题
 * 2. 提供强类型的提供者和消费者函数
 * 3. 在消费者未找到提供者时抛出明确的错误
 *
 * @template T - 上下文值的类型
 * @returns 包含 provide 和 consumer 函数的上下文对象
 *
 * @example
 * ```ts
 * const userContext = createJSContext<User>()
 *
 * // 在应用初始化时提供值
 * userContext.provide({ id: 1, name: "John" })
 *
 * // 在需要使用的地方消费值
 * const user = userContext.consumer()
 * ```
 */
function createJSContext<T>() {
  // 使用闭包存储上下文值，初始状态为空值标识
  let contextValue: ContextValue<T> = NO_VALUE_DEFAULT

  /**
   * 提供上下文值
   * @param value - 要提供的值
   * @description 设置上下文的当前值，通常在应用初始化时调用
   */
  const provide = (value: T) => {
    contextValue = value
  }

  /**
   * 消费上下文值
   * @returns 当前上下文存储的值
   * @throws 如果上下文未设置值（即未在 Provider 中调用 provide）
   * @description 获取当前上下文值，必须在使用前先通过 provide 设置值
   */
  const consumer = (): T => {
    if (contextValue === NO_VALUE_DEFAULT) {
      throw new TypeError("You should only use this context value inside a provider.")
    }
    return contextValue
  }

  return {
    provide,
    consumer,
  }
}

/**
 * API 客户端上下文
 * @description 管理 Follow API 客户端的全局实例
 */
export const apiContext = createJSContext<FollowAPI>()

/**
 * 认证客户端上下文
 * @description 管理用户认证相关的客户端实例
 */
export const authClientContext = createJSContext<AuthClient>()

/**
 * 查询客户端上下文
 * @description 管理 React Query 的 QueryClient 实例
 */
export const queryClientContext = createJSContext<QueryClient>()

/**
 * API 客户端消费函数
 * @description 获取当前 API 客户端实例，用于发起 API 请求
 * @throws 如果未在应用初始化时提供 API 客户端
 */
export const api = apiContext.consumer

/**
 * 认证客户端消费函数
 * @description 获取当前认证客户端实例，用于处理用户认证
 * @throws 如果未在应用初始化时提供认证客户端
 */
export const authClient = authClientContext.consumer

/**
 * 查询客户端消费函数
 * @description 获取当前查询客户端实例，用于数据查询和缓存管理
 * @throws 如果未在应用初始化时提供查询客户端
 */
export const queryClient = queryClientContext.consumer
