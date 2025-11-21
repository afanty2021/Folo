# Shared 模块文档

[根目录](../../../CLAUDE.md) > [packages](../../) > [internal](../) > **shared**

## 模块职责

`@follow/shared` 是 Folo 项目的共享基础设施包，提供跨平台的认证、环境配置、桥接通信、设置管理等核心功能，是连接不同应用层的粘合剂。

## 入口与启动

- **主入口文件**: `src/index.ts`
- **包类型**: ESM 模块
- **子路径导出**:
  - `.` - 主模块
  - `./*` - 所有模块文件
  - `./interface/*` - 接口定义
- **类型检查**: `pnpm typecheck`

## 主要功能模块

### 1. 认证系统 (Authentication System)
**文件**: `src/auth.ts`
- Better Auth 集成配置
- Stripe 支付认证
- 跨平台认证统一

### 2. 环境配置 (Environment Configuration)
- `src/env.common.ts` - 通用环境配置
- `src/env.desktop.ts` - 桌面端环境配置
- `src/env.rn.ts` - React Native 环境配置
- `src/env.ssr.ts` - SSR 环境配置

### 3. 桥接通信 (Bridge Communication)
**文件**: `src/bridge.ts`
- Electron 主进程与渲染进程通信
- Web 与原生平台桥接
- 事件驱动的消息传递

### 4. 设置管理 (Settings Management)
**目录**: `src/settings/`
- `constants.ts` - 设置常量
- `defaults.ts` - 默认配置
- `hook.ts` - 设置 Hooks
- `interface.ts` - 设置接口定义

### 5. 平台特定功能 (Platform-specific)
- `src/electron.ts` - Electron 特定功能
- `src/event.ts` - 事件系统
- `src/queue.ts` - 任务队列
- `src/language.ts` - 语言管理

### 6. 全局定义 (Global Definitions)
**文件**: `src/global.d.ts`, `src/constants.ts`
- 全局类型声明
- 共享常量定义

## 关键依赖与配置

### 核心依赖
- **better-auth**: `1.3.28` - 现代认证库
- **@better-auth/stripe**: `1.3.28` - Stripe 支付集成
- **drizzle-orm**: `0.44.7` - 数据库 ORM
- **zod**: `3.25.75` - 运行时类型验证
- **ai**: `5.0.87` - AI 功能集成
- **stripe**: `19.1.0` - Stripe 支付处理

### 平台支持
- **@electron-toolkit/preload**: `3.0.2` - Electron 预加载脚本
- **@electron-toolkit/tsconfig**: `2.0.0` - Electron TypeScript 配置

### 生态集成
- **@follow-app/client-sdk**: 客户端 SDK
- **@folo-services/drizzle**: 数据库服务
- **@t3-oss/env-core**: 环境变量管理
- **sonner**: `2.0.7` - 通知系统

## 设计特点

### 1. 跨平台兼容
- 统一的 API 设计
- 平台特定的实现隔离
- 条件编译和环境检测

### 2. 类型安全
- Zod 运行时验证
- 完整的 TypeScript 类型覆盖
- 编译时类型检查

### 3. 可扩展性
- 模块化架构
- 插件式设计
- 配置驱动的功能

### 4. 开发体验
- 统一的错误处理
- 开发者友好的 API
- 完善的类型提示

## API 使用示例

### 认证系统
```typescript
import { auth } from "@follow/shared/auth"

// 用户认证
const { data: session } = await auth.signIn({
  email: "user@example.com",
  password: "password"
})
```

### 环境配置
```typescript
import { env } from "@follow/shared/env.common"

// 类型安全的环境变量访问
const apiUrl = env.API_URL
const isDevelopment = env.NODE_ENV === "development"
```

### 设置管理
```typescript
import { useSettings } from "@follow/shared/settings/hook"

function SettingsComponent() {
  const [settings, updateSettings] = useSettings()

  const handleThemeChange = (theme: string) => {
    updateSettings({ theme })
  }
}
```

### 桥接通信
```typescript
import { bridge } from "@follow/shared/bridge"

// Electron 主进程通信
const result = await bridge.invoke("get-system-info")
```

## 架构设计

### 1. 分层架构
```
Applications (apps/*)
    ↓
Shared Layer (@follow/shared)
    ↓
Platform Services
    ↓
System APIs
```

### 2. 模块组织
```
src/
├── auth.ts          # 认证系统
├── bridge.ts        # 桥接通信
├── env.*.ts         # 环境配置
├── settings/        # 设置管理
├── platform/        # 平台特定
└── utils/           # 工具函数
```

### 3. 依赖关系
- 认证系统依赖环境配置
- 设置管理依赖桥接通信
- 平台特定功能依赖基础服务

## 环境配置管理

### 1. 配置层级
- 基础配置 (common)
- 平台配置 (desktop/rn/ssr)
- 应用配置 (specific)

### 2. 类型安全
```typescript
import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_API_URL: z.string().url(),
    VITE_WEB_URL: z.string().url(),
  },
  runtimeEnv: import.meta.env,
})
```

### 3. 平台检测
```typescript
export const isElectron = !!window.electronAPI
export const isReactNative = !!navigator.product?.match(/ReactNative/)
export const isSSR = typeof window === "undefined"
```

## 认证系统设计

### 1. 多Provider支持
- 邮箱密码认证
- OAuth 第三方登录
- Stripe 订阅集成

### 2. 会话管理
- 自动刷新令牌
- 跨标签页同步
- 安全登出机制

### 3. 权限控制
- 基于角色的访问控制
- 功能级权限管理
- API 级别鉴权

## 文件清单

### 核心模块
- `src/index.ts` - 主导出文件
- `src/auth.ts` - 认证系统
- `src/bridge.ts` - 桥接通信
- `src/constants.ts` - 共享常量
- `src/event.ts` - 事件系统
- `src/language.ts` - 语言管理
- `src/queue.ts` - 任务队列

### 环境配置
- `src/env.common.ts` - 通用环境
- `src/env.desktop.ts` - 桌面端环境
- `src/env.rn.ts` - React Native 环境
- `src/env.ssr.ts` - SSR 环境

### 设置管理 (4个文件)
- `src/settings/constants.ts`
- `src/settings/defaults.ts`
- `src/settings/hook.ts`
- `src/settings/interface.ts`

### 平台特定
- `src/electron.ts` - Electron 支持
- `src/global.d.ts` - 全局声明

### 文件统计
- **总文件数**: 17 个 TypeScript 文件
- **代码行数**: 约 2000+ 行
- **模块数量**: 8 个主要模块
- **导出路径**: 10+ 个子路径

## 变更记录 (Changelog)

- **2025-11-21** - 创建初始模块文档，分析共享基础设施架构

## 相关链接

- [@follow/hooks](../hooks/CLAUDE.md) - React Hooks 库
- [@follow/utils](../utils/CLAUDE.md) - 工具函数库
- [@follow/store](../store/CLAUDE.md) - 状态管理
- [Better Auth](https://better-auth.com/) - 认证库文档
- [Drizzle ORM](https://orm.drizzle.team/) - 数据库 ORM
- [Electron](https://www.electronjs.org/) - 桌面应用框架