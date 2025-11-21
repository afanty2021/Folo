# Store 模块文档

[根目录](../../../CLAUDE.md) > [packages](../../) > [internal](../) > **store**

## 模块职责

`@follow/store` 是 Folo 项目的核心状态管理模块，基于 Zustand 构建，提供了完整的数据管理架构，包括订阅、条目、收藏、用户、未读等核心业务数据的状态管理。

## 入口与启动

- **包类型**: ESM 模块
- **导出方式**: 模块化子路径导出（支持按需导入）
- **类型检查**: `pnpm typecheck`
- **对等依赖**: React 19.0.0

## 主要功能模块

### 1. 核心架构 (Core Architecture)
- `src/context.ts` - 应用上下文管理（API、认证、查询客户端）
- `src/lib/base.ts` - 基础接口定义（Hydratable、Resetable）
- `src/lib/helper.ts` - Zustand 辅助函数和工具
- `src/lib/stream.ts` - 流数据处理
- `src/types.ts` - 全局类型定义

### 2. 订阅管理 (Subscription Management)
**路径**: `./subscription/*`
- `store.ts` - 订阅状态管理
- `hooks.ts` - 订阅相关 Hooks
- `getters.ts` - 订阅数据获取器
- `selectors.ts` - 订阅选择器
- `types.ts` - 订阅类型定义
- `utils.ts` - 订阅工具函数

### 3. 条目管理 (Entry Management)
**路径**: `./entry/*`
- `store.ts` - 条目状态管理（核心模块，700+ 行）
- `hooks.ts` - 条目相关 Hooks
- `getters.ts` - 条目数据获取器
- `types.ts` - 条目类型定义
- `utils.ts` - 条目工具函数

### 4. 订阅源管理 (Feed Management)
**路径**: `./feed/*`
- `store.ts` - 订阅源状态管理
- `hooks.ts` - 订阅源相关 Hooks
- `getters.ts` - 订阅源数据获取器
- `selectors.ts` - 订阅源选择器
- `types.ts` - 订阅源类型定义

### 5. 收藏管理 (Collection Management)
**路径**: `./collection/*`
- `store.ts` - 收藏状态管理
- `hooks.ts` - 收藏相关 Hooks
- `getters.ts` - 收藏数据获取器
- `types.ts` - 收藏类型定义

### 6. 用户管理 (User Management)
**路径**: `./user/*`
- `store.ts` - 用户状态管理
- `hooks.ts` - 用户相关 Hooks
- `getters.ts` - 用户数据获取器
- `constants.ts` - 用户常量
- `types.ts` - 用户类型定义

### 7. 未读管理 (Unread Management)
**路径**: `./unread/*`
- `store.ts` - 未读状态管理
- `hooks.ts` - 未读相关 Hooks
- `getters.ts` - 未读数据获取器
- `selectors.ts` - 未读选择器
- `types.ts` - 未读类型定义
- `utils.ts` - 未读工具函数

### 8. 图片管理 (Image Management)
**路径**: `./image/*`
- `store.ts` - 图片状态管理
- `hooks.ts` - 图片相关 Hooks
- `getters.ts` - 图片数据获取器

### 9. 列表管理 (List Management)
**路径**: `./list/*`
- `store.ts` - 列表状态管理
- `hooks.ts` - 列表相关 Hooks
- `getters.ts` - 列表数据获取器
- `types.ts` - 列表类型定义

### 10. 收件箱管理 (Inbox Management)
**路径**: `./inbox/*`
- `store.ts` - 收件箱状态管理
- `hooks.ts` - 收件箱相关 Hooks
- `getters.ts` - 收件箱数据获取器
- `types.ts` - 收件箱类型定义

### 11. 摘要管理 (Summary Management)
**路径**: `./summary/*`
- `store.ts` - 摘要状态管理
- `hooks.ts` - 摘要相关 Hooks
- `getters.ts` - 摘要数据获取器
- `enum.ts` - 摘要枚举
- `utils.ts` - 摘要工具函数

### 12. 翻译管理 (Translation Management)
**路径**: `./translation/*`
- `store.ts` - 翻译状态管理
- `hooks.ts` - 翻译相关 Hooks
- `types.ts` - 翻译类型定义

### 13. 活动管理 (Action Management)
**路径**: `./action/*`
- `store.ts` - 活动状态管理
- `hooks.ts` - 活动相关 Hooks
- `constant.ts` - 活动常量

### 14. 数据持久化与同步 (Persistence & Sync)
- `src/hydrate.ts` - 数据水合
- `src/reset.ts` - 状态重置
- `src/morph/` - 数据转换模块
  - `api.ts` - API 数据转换
  - `db-store.ts` - 数据库到 Store 转换
  - `store-db.ts` - Store 到数据库转换

### 15. 常量配置 (Constants & Config)
**路径**: `./constants/*`
- `app.ts` - 应用常量
- `onboarding.ts` - 引导流程常量

### 16. 类型定义 (Type Definitions)
**路径**: `./@types/*`
- `default-resource.ts` - 默认资源类型
- `i18next.d.ts` - i18next 类型扩展

## 关键依赖与配置

### 内部依赖
- `@follow/database`: 数据库服务层
- `@follow/models`: 数据模型定义
- `@follow/constants`: 常量定义
- `@follow/shared`: 共享工具和类型
- `@follow/tracker`: 数据追踪
- `@follow/utils`: 工具函数库
- `@follow/configs`: 配置管理
- `@follow-app/client-sdk`: 客户端 SDK

### 外部依赖
- **zustand**: `5.0.8` - 状态管理核心
- **@tanstack/react-query**: `5.90.6` - 服务器状态管理
- **immer**: `10.2.0` - 不可变状态更新
- **es-toolkit**: `1.41.0` - 现代 JavaScript 工具库

### 对等依赖
- **react**: `19.0.0` - React 框架

## 核心设计模式

### 1. 模块化架构
每个业务领域独立模块：
- 独立的状态管理
- 独立的 Hooks 和选择器
- 统一的数据流模式

### 2. 事务性操作
`createTransaction()` 模式：
```typescript
const tx = createTransaction()
tx.store(() => { /* 更新内存状态 */ })
tx.persist(() => { /* 持久化到数据库 */ })
tx.request(() => { /* API 请求 */ })
tx.rollback(() => { /* 回滚操作 */ })
await tx.run()
```

### 3. 数据水合机制
`Hydratable` 接口：
- 应用启动时从数据库水合数据
- 增量同步机制
- 状态一致性保证

### 4. 不可变状态更新
- Immer 集成，安全的状态更新
- 性能优化的批量更新
- 细粒度的状态变更追踪

### 5. 上下文管理
全局依赖注入：
- API 客户端上下文
- 认证客户端上下文
- React Query 客户端上下文

## API 使用示例

### 基础状态管理
```typescript
import { useEntryStore, entryActions } from "@follow/store/entry"
import { useFeedStore } from "@follow/store/feed"

// 在组件中使用状态
function EntryList() {
  const entries = useEntryStore((state) => state.data)

  const handleMarkRead = async (entryId: string) => {
    await entryActions.markEntryReadStatusInSession({
      entryIds: [entryId],
      read: true
    })
  }
}
```

### 数据同步
```typescript
import { entrySyncServices } from "@follow/store/entry"

// 获取条目列表
const fetchEntries = async () => {
  await entrySyncServices.fetchEntries({
    view: FeedViewType.Articles,
    limit: 20,
    read: false
  })
}
```

### 订阅管理
```typescript
import { useSubscriptionStore } from "@follow/store/subscription"
import { subscriptionActions } from "@follow/store/subscription"

function SubscriptionManager() {
  const subscriptions = useSubscriptionStore((state) => state.data)

  const handleSubscribe = async (feedId: string) => {
    await subscriptionActions.subscribe({
      feedId,
      view: FeedViewType.Articles,
      category: "default"
    })
  }
}
```

### 上下文使用
```typescript
import { api, authClient, queryClient } from "@follow/store/context"

// 在服务层使用 API
const fetchUserData = async () => {
  const response = await api().user.get()
  return response.data
}
```

## 状态管理架构

### 1. 分层架构
```
Components (React Components)
    ↓
Hooks (Custom Hooks)
    ↓
Store (Zustand Stores)
    ↓
Services (API & Database)
    ↓
Database (SQLite/Remote API)
```

### 2. 数据流
```
User Action
    ↓
Store Action
    ↓
Transaction (Store + API + DB)
    ↓
State Update + Persistence
    ↓
UI Re-render
```

### 3. 模块通信
- 通过 Action 类进行跨模块操作
- 共享的上下文和工具函数
- 统一的数据转换层（morph）

## 测试与质量

### 当前状态
- **测试覆盖**: ❌ 无单元测试
- **类型安全**: ✅ 完整的 TypeScript 覆盖
- **文档覆盖**: ⚠️ 部分模块有注释
- **架构设计**: ✅ 模块化、可扩展

### 建议改进
1. 为核心 Actions 类添加单元测试
2. 添加集成测试覆盖数据流
3. 完善类型定义和 JSDoc 注释
4. 添加性能监控和优化

## 文件清单

### 核心文件
- `src/context.ts` - 上下文管理
- `src/lib/` - 基础库和工具（4个文件）
- `src/types.ts` - 类型定义
- `src/hydrate.ts` - 数据水合
- `src/reset.ts` - 状态重置

### 业务模块（13个）
每个模块包含：
- `store.ts` - Zustand 状态管理
- `hooks.ts` - React Hooks
- `getters.ts` - 数据获取器
- `types.ts` - 类型定义（大部分模块）
- `selectors.ts` - 状态选择器（部分模块）
- `utils.ts` - 工具函数（部分模块）

### 数据转换
- `src/morph/api.ts` - API 数据转换
- `src/morph/db-store.ts` - DB 到 Store 转换
- `src/morph/store-db.ts` - Store 到 DB 转换

### 配置和类型
- `src/constants/` - 常量定义（2个文件）
- `src/@types/` - 类型扩展（2个文件）

### 文件统计
- **总文件数**: 70+ 个 TypeScript 文件
- **核心模块**: 13 个业务模块
- **代码行数**: 约 8000+ 行
- **导出路径**: 15+ 个子路径导出

## 变更记录 (Changelog)

- **2025-11-21** - 创建初始模块文档，分析整个状态管理架构

## 相关链接

- [@follow/hooks](../hooks/CLAUDE.md) - React Hooks 库
- [@follow/models](../models/CLAUDE.md) - 数据模型
- [@follow/database](../database/CLAUDE.md) - 数据库服务
- [Zustand 文档](https://docs.pmnd.rs/zustand/) - 状态管理库
- [Immer 文档](https://immerjs.github.io/immer/) - 不可变状态
- [TanStack Query 文档](https://tanstack.com/query/latest) - 服务器状态