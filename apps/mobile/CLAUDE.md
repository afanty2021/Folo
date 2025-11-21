# Mobile 应用模块

[根目录](../../CLAUDE.md) > [apps](../) > **mobile**

## 模块职责

跨平台移动应用，支持 iOS 和 Android。基于 React Native + Expo 技术栈，提供原生移动体验、推送通知、生物识别等移动端特有功能。

## 入口与启动

### 应用入口
- **文件**: `src/main.tsx`
- **功能**: React Native 应用根组件、导航配置

### 启动流程
1. Expo 应用初始化
2. 原生模块加载
3. 认证状态检查
4. 导航到相应页面

## 对外接口

### 原生模块集成
位于 `native/` 目录：
- **生物识别**: 面容 ID、指纹识别
- **推送通知**: Firebase Messaging
- **本地存储**: SecureStore
- **媒体处理**: 图片选择、相机

### API 集成
- **@follow-app/client-sdk**: 客户端 SDK
- **@folo-services/ai-tools**: AI 服务
- **Sentry**: 错误监控
- **PostHog**: 用户行为分析

## 关键依赖与配置

### 核心依赖
```json
{
  "expo": "53.0.12",
  "react-native": "0.79.6",
  "react": "19.0.0",
  "react-dom": "19.0.0"
}
```

### 状态管理
```json
{
  "jotai": "2.15.1",
  "zustand": "5.0.8",
  "@tanstack/react-query": "5.90.6"
}
```

### UI 和样式
```json
{
  "nativewind": "4.2.1",
  "tailwindcss": "3.4.17",
  "react-native-svg": "15.12.0",
  "react-native-reanimated": "4.1.0"
}
```

### 内部依赖
```json
{
  "@follow/components": "workspace:*",
  "@follow/constants": "workspace:*",
  "@follow/database": "workspace:*",
  "@follow/hooks": "workspace:*",
  "@follow/models": "workspace:*",
  "@follow/shared": "workspace:*",
  "@follow/store": "workspace:*",
  "@follow/tracker": "workspace:*",
  "@follow/types": "workspace:*",
  "@follow/utils": "workspace:*"
}
```

## 数据模型

### 本地数据库
- **SQLite**: 通过 `expo-sqlite` 和 `@follow/database`
- **缓存**: LRU Cache、AsyncStorage
- **状态持久化**: Query Sync Storage Persister

### 数据同步
- 离线优先策略
- 增量同步机制
- 冲突解决策略

## 测试与质量

### 测试策略
- Jest 单元测试
- React Native Testing Library
- Expo EAS Build 测试

### 质量工具
- **类型检查**: TypeScript
- **代码检查**: ESLint
- **格式化**: Prettier
- **性能监控**: React DevTools

## 常见问题 (FAQ)

### Q: 如何处理 iOS 和 Android 平台差异？
A: 使用 `Platform.OS` 判断，或创建平台特定文件（如 `Button.ios.tsx`, `Button.android.tsx`）。

### Q: 如何优化应用性能？
A:
1. 使用 `React.memo` 优化组件
2. 合理使用 `useCallback` 和 `useMemo`
3. 图片懒加载和缓存
4. 列表虚拟化（FlashList）

### Q: 如何处理推送通知？
A: 使用 `expo-notifications`，配置在 `app.json` 中，配合 Firebase 进行远程推送。

### Q: 如何处理生物识别？
A: 使用 `expo-local-authentication`，支持面容 ID、指纹识别等。

## 相关文件清单

### 核心文件
- `src/main.tsx` - 应用入口
- `package.json` - 依赖和脚本
- `app.json` - Expo 配置
- `eas.json` - EAS Build 配置

### 配置文件
- `metro.config.js` - Metro 打包配置
- `babel.config.js` - Babel 转换配置
- `tsconfig.json` - TypeScript 配置

### 关键目录
- `src/` - 源代码
- `native/` - 原生模块
- `assets/` - 静态资源
- `scripts/` - 构建脚本

## 开发指南

### 本地开发
```bash
# 进入目录
cd apps/mobile

# 启动开发服务器
pnpm run start

# iOS 开发
pnpm run ios

# Android 开发
pnpm run android

# Web 预览
pnpm run web
```

### 构建发布
```bash
# EAS 构建
eas build --platform ios
eas build --platform android

# 预览构建
eas build --profile preview --platform ios
```

### 调试技巧
1. 使用 Expo DevTools
2. React Native Debugger
3. Flipper 调试工具
4. 真机调试优于模拟器

### 性能优化
- 使用 `useWindowDimensions` 获取屏幕尺寸
- 图片使用 `react-native-image-picker` 优化
- 列表使用 `FlashList` 虚拟化
- 合理使用 `InteractionManager`

## 平台特性

### iOS 特性
- 面容 ID 识别
- 推送通知权限
- 后台应用刷新
- Apple Pay 集成

### Android 特性
- 指纹识别
- 通知渠道
- 后台服务
- Google Play 内购

## 变更记录 (Changelog)

- **2025-11-21 08:18:00** - 初始化模块文档，识别核心功能和平台特性