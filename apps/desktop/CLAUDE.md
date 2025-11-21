# Desktop 应用模块

[根目录](../../CLAUDE.md) > [apps](../) > **desktop**

## 模块职责

跨平台桌面应用，支持 Windows、macOS、Linux。基于 Electron + React + Vite 技术栈，提供原生桌面体验和系统集成功能。

## 入口与启动

### 主进程入口
- **文件**: `layer/main/src/index.ts`
- **功能**: Electron 主进程启动、窗口管理、系统集成

### 渲染进程入口
- **文件**: `layer/renderer/src/App.tsx`
- **功能**: React 应用根组件、路由配置

### 启动流程
1. `layer/main/src/bootstrap.ts` - 应用初始化
2. `layer/main/src/manager/window.ts` - 窗口创建
3. `layer/main/src/lib/router.ts` - 路由配置
4. 渲染进程 React 应用启动

## 对外接口

### IPC 通信接口
位于 `layer/main/src/ipc/services/`：
- **app.ts**: 应用级别操作（退出、重启等）
- **auth.ts**: 认证相关操作
- **debug.ts**: 调试和开发工具
- **dock.ts**: macOS Dock 集成
- **integration.ts**: 系统集成功能
- **menu.ts**: 应用菜单管理
- **reader.ts**: 阅读模式功能
- **setting.ts**: 设置项管理

### 系统集成
- **托盘**: `layer/main/src/lib/tray.ts`
- **自动更新**: `layer/main/src/updater/`
- **代理设置**: `layer/main/src/lib/proxy.ts`

## 关键依赖与配置

### 核心依赖
```json
{
  "electron": "38.3.0",
  "electron-vite": "4.0.1",
  "@electron-forge/cli": "7.10.2",
  "react": "19.0.0",
  "react-dom": "19.0.0"
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
  "@follow/utils": "workspace:*"
}
```

### 配置文件
- `electron.vite.config.ts` - Electron Vite 配置
- `configs/vite.electron-render.config.ts` - 渲染进程构建配置
- `forge.config.js` - Electron Forge 打包配置

## 数据模型

使用共享的数据模型包：
- `@follow/models` - 业务模型
- `@follow/database` - 数据库操作（SQLite）

### 本地存储
- SQLite 数据库（通过 `@follow/database`）
- 应用设置（Electron Store）
- 缓存数据（IndexedDB）

## 测试与质量

### 测试文件
- `layer/main/src/lib/proxy.test.ts` - 代理功能测试
- `layer/renderer/src/lib/__tests__/parse-html.test.ts` - HTML 解析测试
- `layer/renderer/src/store/utils/helper.test.ts` - Store 工具测试

### 质量工具
- **类型检查**: TypeScript 严格模式
- **代码检查**: ESLint + TSSLint
- **格式化**: Prettier

## 常见问题 (FAQ)

### Q: 如何调试主进程？
A: 使用 VS Code 调试配置，在 `layer/main/src/index.ts` 设置断点，或在代码中添加 `debugger` 语句。

### Q: 如何处理跨平台差异？
A: 使用 `process.platform` 判断平台，平台特定代码放在对应的目录下，如 `layer/main/src/platforms/`。

### Q: 如何优化启动性能？
A:
1. 延迟加载非关键模块
2. 使用 Electron Vite 的代码分割
3. 优化主进程初始化顺序
4. 缓存常用数据

### Q: 如何处理自动更新？
A: 使用 `electron-updater`，配置在 `layer/main/src/updater/` 目录下，支持增量更新和回滚。

## 相关文件清单

### 核心文件
- `layer/main/src/index.ts` - 主进程入口
- `layer/renderer/src/App.tsx` - 渲染进程入口
- `package.json` - 依赖和脚本
- `electron.vite.config.ts` - 构建配置

### 配置文件
- `forge.config.js` - 打包配置
- `configs/vite.electron-render.config.ts` - 渲染构建配置

### 关键目录
- `layer/main/src/ipc/` - IPC 通信
- `layer/main/src/updater/` - 自动更新
- `layer/renderer/src/atoms/` - 状态管理
- `layer/renderer/src/components/` - UI 组件

## 开发指南

### 本地开发
```bash
# 进入目录
cd apps/desktop

# 开发模式
pnpm run dev:electron

# 构建应用
pnpm run build:electron

# 打包发布
pnpm run build:electron-forge
```

### 调试技巧
1. 使用 Chrome DevTools 调试渲染进程
2. 使用 VS Code 调试主进程
3. 启用 `DEBUG=true` 环境变量查看详细日志

### 性能优化
- 使用 `React.memo` 优化组件渲染
- 合理使用 `useCallback` 和 `useMemo`
- 主进程避免同步操作
- 使用 Worker 处理重计算任务

## 变更记录 (Changelog)

- **2025-11-21 08:18:00** - 初始化模块文档，识别核心功能和接口