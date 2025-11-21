# Tracker 模块文档

[根目录](../../../CLAUDE.md) > [packages](../../) > [internal](../) > **tracker**

## 模块职责

`@follow/tracker` 是 Folo 项目的数据追踪和分析包，提供统一的多平台追踪接口，支持 PostHog、Firebase、OpenPanel 等多种分析服务，实现用户行为分析和应用性能监控。

## 入口与启动

- **主入口文件**: `src/index.ts`
- **包版本**: `0.0.1`
- **类型检查**: 依赖 `@follow/configs`

## 主要功能模块

### 1. 追踪适配器 (Tracker Adapters)
**目录**: `src/adapters/`

#### 支持的追踪服务
- `posthog.ts` - PostHog 分析服务
- `firebase.ts` - Firebase Analytics
- `openpanel.ts` - OpenPanel 分析平台
- `proxy.ts` - 代理适配器
- `base.ts` - 基础适配器接口

#### 核心接口
```typescript
interface TrackerAdapter {
  track(event: string, properties?: Record<string, any>): void
  identify(userId: string, traits?: Record<string, any>): void
  reset(): void
}
```

### 2. 追踪管理器 (Tracker Manager)
**文件**: `src/manager.ts`, `src/track-manager.ts`
- 多追踪器统一管理
- 配置和初始化
- 错误处理和降级

### 3. 追踪点定义 (Tracker Points)
**文件**: `src/tracker-points.ts`
- 预定义的追踪事件
- 业务事件抽象
- 标准化事件格式

### 4. 操作封装 (Operations)
**目录**: `src/op/`
- 高级追踪操作
- 复合事件处理
- 业务逻辑封装

### 5. 类型系统 (Type System)
**文件**: `src/types.ts`, `src/enums.ts`
- 完整的 TypeScript 类型定义
- 枚举常量定义
- 配置类型

## 核心使用方式

### 初始化追踪器
```typescript
import {
  improvedTrackManager,
  setOpenPanelTracker,
  setFirebaseTracker,
  setPostHogTracker
} from "@follow/tracker"

// 设置追踪器
setOpenPanelTracker({ apiKey: "your-openpanel-key" })
setFirebaseTracker({ config: firebaseConfig })
setPostHogTracker({ apiKey: "your-posthog-key" })
```

### 追踪事件
```typescript
import { tracker } from "@follow/tracker"

// 追踪用户行为
tracker.track("user_login", {
  method: "email",
  timestamp: Date.now()
})

// 追踪页面访问
tracker.track("page_view", {
  page: "/timeline",
  referrer: document.referrer
})
```

### 用户识别
```typescript
import { tracker } from "@follow/tracker"

// 识别用户
tracker.identify("user_123", {
  name: "John Doe",
  email: "john@example.com",
  plan: "pro"
})
```

## 关键依赖与配置

### 对等依赖
- **posthog-js**: `1.255.0` - Web 端 PostHog SDK
- **posthog-react-native**: `4.6.1` - React Native PostHog SDK

### 开发依赖
- **@react-native-firebase/analytics**: `22.2.1` - Firebase Analytics
- **@follow-app/client-sdk**: 客户端 SDK
- **@follow/configs**: 共享配置

## 设计特点

### 1. 多服务支持
- 统一的适配器接口
- 可插拔的追踪服务
- 服务切换透明

### 2. 平台兼容
- Web、移动端统一接口
- 平台特定的适配器
- 条件加载机制

### 3. 错误处理
- 单个服务失败不影响其他
- 优雅降级机制
- 错误日志记录

### 4. 类型安全
- 完整的 TypeScript 支持
- 事件属性类型检查
- 配置类型验证

## 架构设计

### 1. 适配器模式
```
Tracker Manager
    ↓
Tracker Adapters
    ↓
Third-party Services
```

### 2. 事件流
```
User Action
    ↓
Tracker Points
    ↓
Track Manager
    ↓
Multiple Adapters
    ↓
Analytics Services
```

### 3. 配置管理
```typescript
interface TrackerManagerConfig {
  services: {
    posthog?: PostHogAdapterConfig
    firebase?: FirebaseAdapterConfig
    openpanel?: OpenPanelAdapterConfig
  }
  disabled?: boolean
  debug?: boolean
}
```

## 高级功能

### 1. 条件追踪
```typescript
// 只在生产环境追踪
if (process.env.NODE_ENV === "production") {
  tracker.track("conversion_event", { value: 99.99 })
}
```

### 2. 批量事件
```typescript
import { improvedTrackManager } from "@follow/tracker"

// 批量追踪
improvedTrackManager.trackBatch([
  { event: "page_view", properties: { page: "/home" } },
  { event: "user_action", properties: { action: "click" } }
])
```

### 3. 自定义适配器
```typescript
import { TrackerAdapter } from "@follow/tracker"

class CustomAdapter implements TrackerAdapter {
  track(event: string, properties?: Record<string, any>) {
    // 自定义追踪逻辑
  }

  identify(userId: string, traits?: Record<string, any>) {
    // 自定义用户识别
  }

  reset() {
    // 重置逻辑
  }
}
```

## 隐私和合规

### 1. 数据匿名化
- 自动移除敏感信息
- PII 数据过滤
- GDPR 合规支持

### 2. 用户控制
- 追踪开关控制
- 数据导出功能
- 隐私设置管理

### 3. 同意管理
- Cookie 同意集成
- 追踪偏好记录
- 动态同意更新

## 性能考虑

### 1. 异步处理
- 非阻塞事件发送
- 批量数据处理
- 网络请求优化

### 2. 缓存机制
- 本地事件缓存
- 离线事件队列
- 重试机制

### 3. 包大小优化
- 按需加载适配器
- Tree-shaking 支持
- 代码分割

## 文件清单

### 核心文件
- `src/index.ts` - 主导出文件（27行）
- `src/manager.ts` - 追踪管理器
- `src/track-manager.ts` - 改进的追踪管理器
- `src/tracker-points.ts` - 追踪点定义
- `src/types.ts` - 类型定义
- `src/enums.ts` - 枚举定义
- `src/utils.ts` - 工具函数

### 适配器模块 (6个文件)
- `src/adapters/index.ts` - 适配器导出
- `src/adapters/base.ts` - 基础适配器
- `src/adapters/posthog.ts` - PostHog 适配器
- `src/adapters/firebase.ts` - Firebase 适配器
- `src/adapters/openpanel.ts` - OpenPanel 适配器
- `src/adapters/proxy.ts` - 代理适配器

### 操作模块 (2个文件)
- `src/op/index.ts` - 操作导出
- `src/op/api.ts` - API 操作

### 文件统计
- **总文件数**: 15 个 TypeScript 文件
- **代码行数**: 约 2000+ 行
- **适配器数量**: 5 个追踪服务
- **类型定义**: 20+ 个类型

## 变更记录 (Changelog)

- **2025-11-21** - 创建初始模块文档，分析追踪系统架构
- **版本**: 0.0.1 - 初始版本

## 相关链接

- [@follow/shared](../shared/CLAUDE.md) - 共享基础设施
- [@follow/logger](../logger/CLAUDE.md) - 日志管理
- [PostHog 文档](https://posthog.com/docs) - 产品分析平台
- [Firebase Analytics](https://firebase.google.com/docs/analytics) - Google 分析服务
- [OpenPanel](https://openpanel.co/) - 开源分析平台

## 最佳实践

### 1. 事件命名
- 使用一致的命名约定
- 避免使用保留字
- 包含足够的上下文

### 2. 属性设计
- 使用结构化数据
- 避免嵌套过深
- 包含必要的元数据

### 3. 错误处理
- 不要让追踪错误影响主流程
- 记录追踪失败信息
- 提供降级方案