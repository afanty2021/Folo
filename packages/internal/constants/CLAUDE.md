# Constants 模块文档

[根目录](../../../CLAUDE.md) > [packages](../../) > [internal](../) > **constants**

## 模块职责

`@follow/constants` 是 Folo 项目的常量定义包，提供应用级别的常量、枚举、配置和静态数据，确保整个项目使用统一的数据标识和配置信息。

## 入口与启动

- **主入口文件**: `src/index.ts`
- **包类型**: ESM 模块
- **类型检查**: `pnpm typecheck`

## 主要功能模块

### 1. 核心枚举定义 (Core Enums)
**文件**: `src/enums.ts`

#### 用户角色枚举 (UserRole)
```typescript
export enum UserRole {
  Admin = "admin",                    // 管理员
  PreProTrial = "pre_pro_trial",     // Pro 预览试用
  Free = "free",                      // 免费用户
  Trial = "trial",                    // @deprecated 已废弃
  Pro = "pro",                        // Pro 用户
  Plus = "plus",                      // Plus 用户
  Basic = "basic",                    // 基础用户
}
```

#### 路由枚举 (Routes)
```typescript
export enum Routes {
  Timeline = "/timeline",             // 时间线页面
  Discover = "/discover",             // 发现页面
}
```

#### 视图类型 (FeedViewType)
- 从 `@follow-app/client-sdk` 导入
- 定义不同的内容视图类型

#### 用户角色工具函数
```typescript
// 角色名称映射
export const UserRoleName: Record<UserRole, string>

// 角色优先级映射
export const UserRolePriority: Record<UserRole, number>

// 免费角色检测
export const isFreeRole = (role?: UserRole | null) => boolean
```

### 2. 应用配置 (App Configuration)
**文件**: `src/app.ts`

#### 应用商店信息
```typescript
export const APPLE_APP_STORE_ID = "6739802604"
export const GOOGLE_PLAY_PACKAGE_ID = "is.follow"

export const APP_STORE_URLS = {
  iOS: `https://apps.apple.com/us/app/folo-follow-everything/id${APPLE_APP_STORE_ID}`,
  Android: `https://play.google.com/store/apps/details?id=${GOOGLE_PLAY_PACKAGE_ID}`,
} as const
```

### 3. 社交媒体链接 (Social Media Links)
**文件**: `src/social.ts`

#### 社交平台配置
```typescript
export const SocialMediaLinks = [
  {
    iconClassName: "i-mgc-github-cute-fi text-[#000000] dark:text-[#ffffff]",
    label: "GitHub",
    url: "https://github.com/RSSNext/Folo",
  },
  {
    iconClassName: "i-mgc-discord-cute-fi text-[#5865F2] dark:brightness-125",
    label: "Discord",
    url: "https://discord.gg/AwWcAQ7euc",
  },
  {
    iconClassName: "i-mgc-social-x-cute-re text-[#000000] dark:text-[#ffffff]",
    label: "X",
    url: "https://x.com/intent/follow?screen_name=folo_is",
  },
]
```

### 4. 认证提供商 (Auth Providers)
**文件**: `src/auth-providers.ts`
- 认证服务提供商配置

### 5. RSSHub 配置
**文件**: `src/rsshub.ts`
- RSSHub 服务相关常量

### 6. 标签页配置 (Tabs Configuration)
**文件**: `src/tabs.ts`
- 应用标签页配置（从 index.ts 导出但文件不存在）

## 关键依赖与配置

### 外部依赖
- `@follow-app/client-sdk`: 客户端 SDK（FeedViewType）

### 内部依赖
- `@follow/configs`: 共享配置
- `@follow/types`: TypeScript 类型定义

## 设计特点

### 1. 类型安全优先
- 所有常量都有明确的类型定义
- 枚举提供编译时类型检查
- 工具函数确保类型安全

### 2. 配置集中化
- 应用配置统一管理
- 环境相关的配置集中
- 社交媒体链接标准化

### 3. 向后兼容性
- 废弃字段有明确标记
- 迁移指南和注释
- 渐进式更新支持

## API 使用示例

### 用户角色管理
```typescript
import { UserRole, isFreeRole, UserRolePriority, UserRoleName } from "@follow/constants"

// 角色检查
const userRole = UserRole.Pro
const isFreeUser = isFreeRole(userRole) // false

// 获取角色信息
const rolePriority = UserRolePriority[UserRole.Admin] // 4
const roleDisplayName = UserRoleName[UserRole.Free] // "Free"
```

### 路由管理
```typescript
import { Routes } from "@follow/constants"

// 路由导航
const navigateToTimeline = () => {
  router.push(Routes.Timeline)
}
```

### 应用商店链接
```typescript
import { APP_STORE_URLS } from "@follow/constants/app"

// 平台检测和跳转
const redirectToAppStore = () => {
  if (isIOS()) {
    window.location.href = APP_STORE_URLS.iOS
  } else if (isAndroid()) {
    window.location.href = APP_STORE_URLS.Android
  }
}
```

### 社交媒体链接
```typescript
import { SocialMediaLinks } from "@follow/constants/social"

// 渲染社交链接
const SocialLinks = () => (
  <div>
    {SocialMediaLinks.map(({ iconClassName, label, url }) => (
      <a key={label} href={url} className={iconClassName}>
        {label}
      </a>
    ))}
  </div>
)
```

## 常量管理最佳实践

### 1. 组织结构
```typescript
// 按功能模块组织
export const API_ENDPOINTS = {
  USER: "/api/user",
  FEEDS: "/api/feeds",
} as const

// 按环境配置
export const ENV_CONFIG = {
  DEVELOPMENT: "dev",
  PRODUCTION: "prod",
} as const
```

### 2. 类型定义
```typescript
// 使用 as const 确保字面量类型
export const COLORS = {
  PRIMARY: "#007AFF",
  SECONDARY: "#5856D6",
} as const

type ColorType = typeof COLORS[keyof typeof COLORS]
```

### 3. 工具函数
```typescript
// 常量相关的工具函数
export const isValidRole = (role: string): role is UserRole => {
  return Object.values(UserRole).includes(role as UserRole)
}
```

## 配置管理

### 1. 环境相关常量
- 开发环境配置
- 生产环境配置
- 测试环境配置

### 2. 平台相关常量
- iOS 应用配置
- Android 应用配置
- Web 应用配置

### 3. 业务相关常量
- 用户权限配置
- 功能开关配置
- 业务规则常量

## 维护指南

### 添加新常量
1. 在合适的文件中添加常量定义
2. 使用 `as const` 确保类型安全
3. 添加相关类型定义和工具函数
4. 更新文档和使用示例

### 更新现有常量
1. 检查影响范围
2. 保持向后兼容性
3. 添加废弃标记和迁移说明
4. 更新相关测试

### 枚举管理
1. 新增枚举值时考虑兼容性
2. 废弃枚举值要有明确标记
3. 提供枚举工具函数
4. 维护枚举映射表

## 文件清单

### 核心文件
- `src/index.ts` - 主导出文件（7行）
- `src/enums.ts` - 核心枚举定义（51行）
- `src/app.ts` - 应用配置（8行）
- `src/social.ts` - 社交媒体链接（18行）
- `src/auth-providers.ts` - 认证提供商配置
- `src/rsshub.ts` - RSSHub 配置

### 导出结构
```typescript
// 主要导出
export * from "./app"
export * from "./auth-providers"
export * from "./enums"
export * from "./rsshub"
export * from "./social"
export * from "./tabs"
```

### 文件统计
- **总文件数**: 5-6 个 TypeScript 文件
- **代码行数**: 约 100+ 行
- **枚举定义**: 3 个主要枚举
- **常量项**: 20+ 个配置项

## 变更记录 (Changelog)

- **2025-11-21** - 创建初始模块文档，分析常量定义结构
- **历史变更** - Trial 角色废弃，迁移到 Free 角色

## 相关链接

- [@follow/models](../models/CLAUDE.md) - 数据模型定义
- [@follow/types](../types/CLAUDE.md) - TypeScript 类型定义
- [@follow/configs](../configs/CLAUDE.md) - 配置管理
- [TypeScript 枚举](https://www.typescriptlang.org/docs/handbook/enums.html) - 枚举文档

## 规划和扩展

### 即将添加的常量
- API 端点配置
- 错误代码定义
- 功能开关配置
- 主题和样式常量

### 改进建议
- 添加常量验证工具
- 提供配置热更新机制
- 增加环境检测工具
- 完善类型推断支持