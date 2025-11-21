# SSR 服务端渲染模块

[根目录](../../CLAUDE.md) > [apps](../) > **ssr**

## 模块职责

提供 Next.js 风格的服务端渲染能力，优化首屏加载性能和 SEO。基于 Fastify + React 技术栈，支持路由预渲染、静态生成和服务端数据预取。

## 入口与启动

### 服务入口
- **文件**: `index.ts`
- **功能**: Fastify 服务器启动、路由配置、中间件设置

### 启动流程
1. 环境变量加载
2. 数据库连接初始化
3. Fastify 服务器创建
4. 路由和中间件注册
5. 服务启动监听

## 对外接口

### HTTP API
- **路由**: 基于文件系统的路由生成
- **中间件**: 请求上下文、错误处理、CORS
- **静态资源**: Vite 构建产物服务

### 渲染接口
- **服务端渲染**: React 组件服务端渲染
- **数据预取**: 路由级别的数据预加载
- **静态生成**: 构建时静态页面生成

## 关键依赖与配置

### 核心依赖
```json
{
  "fastify": "5.6.0",
  "react": "19.0.0",
  "react-dom": "19.0.0",
  "react-router": "7.9.5"
}
```

### 渲染相关
```json
{
  "motion": "12.23.24",
  "sonner": "2.0.7",
  "react-hotkeys-hook": "5.2.1",
  "react-i18next": "16.2.4"
}
```

### 内部依赖
```json
{
  "@follow/components": "workspace:*",
  "@follow/configs": "workspace:*",
  "@follow/constants": "workspace:*",
  "@follow/hooks": "workspace:*",
  "@follow/models": "workspace:*",
  "@follow/shared": "workspace:*",
  "@follow/types": "workspace:*",
  "@follow/utils": "workspace:*"
}
```

## 数据模型

### 服务端数据
- 使用 `@follow/database` 进行数据访问
- 支持多数据源和缓存策略
- 数据预取和序列化

### 渲染上下文
- **用户信息**: 认证状态和权限
- **主题配置**: 用户偏好设置
- **应用配置**: 全局配置项

## 测试与质量

### 测试文件
- 单元测试覆盖核心渲染逻辑
- 集成测试验证 API 端点
- E2E 测试检查渲染结果

### 质量工具
- **类型检查**: TypeScript
- **代码检查**: ESLint
- **性能监控**: 渲染时间、内存使用

## 常见问题 (FAQ)

### Q: 如何处理服务端和客户端的状态同步？
A: 使用 Jotai 的 `useHydrateAtoms` 和 `atomWithStorage` 进行状态同步。

### Q: 如何优化服务端渲染性能？
A:
1. 启用渲染结果缓存
2. 使用流式渲染
3. 数据预取并行化
4. 静态页面生成

### Q: 如何处理错误页面？
A: 实现全局错误边界，提供友好的错误页面和错误上报机制。

### Q: 如何支持国际化？
A: 使用 `react-i18next` 服务端预加载语言包，支持路由级别的语言切换。

## 相关文件清单

### 核心文件
- `index.ts` - 服务入口
- `package.json` - 依赖和脚本
- `tsconfig.json` - TypeScript 配置

### 配置文件
- `vite.config.ts` - Vite 构建配置
- `vercel.json` - Vercel 部署配置

### 关键目录
- `src/` - 源代码
- `routes/` - 路由定义
- `pages/` - 页面组件
- `api/` - API 端点

## 开发指南

### 本地开发
```bash
# 进入目录
cd apps/ssr

# 开发模式
pnpm run dev

# 构建应用
pnpm run build

# 启动服务
pnpm run start

# 类型检查
pnpm run typecheck
```

### 构建部署
```bash
# Vercel 部署
vercel --prod

# 本地构建测试
pnpm run build
pnpm run start
```

### 调试技巧
1. 使用 Chrome DevTools 调试服务端代码
2. 检查网络请求和响应时间
3. 监控内存和 CPU 使用
4. 分析渲染性能指标

### 性能优化
- 实现智能缓存策略
- 使用 CDN 加速静态资源
- 启用 Gzip 压缩
- 优化数据查询和序列化

## SEO 优化

### Meta 标签
- 动态生成页面标题和描述
- 结构化数据（JSON-LD）
- Open Graph 和 Twitter Card

### 性能指标
- Core Web Vitals 优化
- 首屏渲染时间
- 累积布局偏移

## 监控和分析

### 错误监控
- Sentry 错误追踪
- 性能指标收集
- 用户行为分析

### 性能监控
- 响应时间监控
- 错误率统计
- 资源使用情况

## 变更记录 (Changelog)

- **2025-11-21 08:18:00** - 初始化模块文档，识别 SSR 核心功能和优化策略