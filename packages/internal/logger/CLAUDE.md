# Logger 模块文档

[根目录](../../../CLAUDE.md) > [packages](../../) > [internal](../) > **logger**

## 模块职责

`@follow/logger` 是 Folo 项目的日志管理包，提供跨平台的统一日志接口，支持桌面端（Electron）和 Web 环境的日志记录功能。

## 入口与启动

- **包类型**: 条件导出模块
- **默认导出**: `./electron.ts` (桌面端)
- **Web 导出**: `./web.ts` (Web 端)
- **类型检查**: `pnpm typecheck`

## 主要功能模块

### 1. 桌面端日志 (Desktop Logging)
**文件**: `electron.ts`
- 基于 `electron-log` 库
- 完整的桌面端日志功能
- 文件日志和控制台日志

### 2. Web 端日志 (Web Logging)
**文件**: `web.ts`
- 基于 `console.log` 的简单实现
- 浏览器控制台日志
- 轻量级 Web 日志

## 核心接口

### 日志方法
- `log(...args: any[])` - 日志记录
- `initialize()` - 日志系统初始化

### 使用方式
```typescript
import { log, initialize } from "@follow/logger"

// 初始化日志系统
initialize()

// 记录日志
log("Application started", { version: "1.0.0" })
```

## 平台特定实现

### 桌面端 (Electron)
```typescript
// electron.ts - 基于 electron-log
export { initialize, log } from "electron-log"
```

**特性**:
- 文件日志存储
- 多级别日志（debug, info, warn, error）
- 日志文件轮转
- 跨进程日志

### Web 端 (Browser)
```typescript
// web.ts - 基于 console
export const log = (...args: any[]) => {
  console.log(...args)
}

export const initialize = () => {}
```

**特性**:
- 控制台输出
- 简单实现
- 零配置

## 关键依赖与配置

### 桌面端依赖
- **electron-log**: `5.4.3` - Electron 日志库

### 开发依赖
- **@follow/configs**: 共享配置

## 设计特点

### 1. 平台适配
- 条件导出机制
- 统一的 API 接口
- 平台特定的实现

### 2. 零配置使用
- 简单的初始化
- 开箱即用的日志功能
- 最小化的配置需求

### 3. 性能考虑
- 桌面端异步日志写入
- Web 端直接控制台输出
- 轻量级实现

## 使用场景

### 1. 应用启动日志
```typescript
import { log, initialize } from "@follow/logger"

async function startApp() {
  initialize()
  log("Folo application starting...")

  // 应用初始化逻辑
  log("Application initialized successfully")
}
```

### 2. 错误日志记录
```typescript
try {
  await riskyOperation()
} catch (error) {
  log("Operation failed:", error)
}
```

### 3. 调试信息
```typescript
function debugComponent(props: any) {
  log("Component props:", props)
  return <div>{/* 组件内容 */}</div>
}
```

## 扩展建议

### 1. 日志级别
- 添加 debug、info、warn、error 级别
- 环境相关的日志过滤
- 生产环境日志优化

### 2. 日志格式化
- 统一的日志格式
- 时间戳和上下文信息
- 结构化日志支持

### 3. 远程日志
- 错误日志上报
- 性能监控集成
- 用户行为日志

### 4. 日志管理
- 日志文件管理
- 日志轮转策略
- 存储空间优化

## 最佳实践

### 1. 日志内容
- 包含足够的上下文信息
- 避免记录敏感数据
- 使用结构化格式

### 2. 性能影响
- 避免在生产环境记录过多调试日志
- 使用异步日志写入
- 合理控制日志频率

### 3. 错误处理
- 日志系统不应影响主业务逻辑
- 添加日志记录的错误处理
- 提供降级方案

## 文件清单

### 核心文件
- `electron.ts` - 桌面端日志实现（1行）
- `web.ts` - Web 端日志实现（7行）
- `package.json` - 包配置（条件导出）

### 导出结构
```json
{
  "exports": {
    ".": {
      "types": "./electron.ts",
      "web": "./web.ts",
      "default": "./electron.ts"
    }
  }
}
```

### 文件统计
- **总文件数**: 2 个 TypeScript 文件
- **代码行数**: 约 8 行
- **API 数量**: 2 个主要接口
- **平台支持**: 2 个平台

## 变更记录 (Changelog)

- **2025-11-21** - 创建初始模块文档，分析日志管理架构

## 相关链接

- [@follow/shared](../shared/CLAUDE.md) - 共享基础设施
- [@follow/utils](../utils/CLAUDE.md) - 工具函数库
- [electron-log 文档](https://github.com/megahertz/electron-log) - Electron 日志库
- [Console API](https://developer.mozilla.org/en-US/docs/Web/API/Console) - Web 控制台 API

## 路线图

### 短期计划
- [ ] 添加日志级别支持
- [ ] 完善错误处理机制
- [ ] 添加日志格式化

### 中期计划
- [ ] 远程日志上报
- [ ] 性能监控集成
- [ ] 日志分析工具

### 长期计划
- [ ] 实时日志流
- [ ] 日志搜索功能
- [ ] 可视化日志界面