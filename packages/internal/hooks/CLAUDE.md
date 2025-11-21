# Hooks 模块文档

[根目录](../../../CLAUDE.md) > [packages](../../) > [internal](../) > **hooks**

## 模块职责

`@follow/hooks` 是 Folo 项目的共享 React Hooks 库，提供了常用的、经过优化的自定义 Hooks，包括主题管理、DOM 操作、状态管理、乐观更新等功能模块。

## 入口与启动

- **主入口文件**: `src/index.ts`
- **包导出**: 通过 ESM/CommonJS 双模式导出
- **类型检查命令**: `pnpm run typecheck`

## 主要功能模块

### 1. 主题管理 (Theme Management)
- `useIsDark`: 检测当前是否为暗色主题
- `useThemeAtomValue`: 获取主题原子状态值
- `useSyncThemeWebApp`: 同步主题到 Web 应用 DOM
- `useDarkQuery`: 查询系统暗色模式偏好

### 2. DOM 测量与交互 (DOM Measurement & Interaction)
- `useMeasure`: 元素尺寸测量，支持 ResizeObserver 和滚动监听
- `useElementWidth`: 元素宽度测量
- `useLongPress`: 长按手势检测
- `useAnyPointDown`: 多点触控检测
- `useSmoothScroll`: 平滑滚动
- `useTriangleMenu`: 三角形菜单定位

### 3. 状态与生命周期 (State & Lifecycle)
- `useControlled`: 受控/非受控组件状态管理
- `useSetState`: 类组件式 setState Hook
- `usePrevious`: 获取上一次渲染的值
- `useOnce`: 确保 effect 只执行一次
- `useInterval`: 定时器管理
- `useCountDown`: 倒计时功能
- `usePageVisibility`: 页面可见性检测

### 4. 媒体与输入 (Media & Input)
- `useVideo`: 视频播放控制
- `useInputComposition`: 输入法组合事件处理
- `useHTMLMediaHook`: HTML 媒体元素工厂 Hook

### 5. 乐观更新 (Optimistic Updates)
- `useOptimisticMutation`: 乐观变更 Hook
- `createOptimisticConfig`: 乐观更新配置创建
- `optimisticStrategies`: 乐观更新策略集合

### 6. 系统与工具 (System & Utilities)
- `useIsOnline`: 网络连接状态检测
- `useTitle`: 页面标题管理
- `useRefValue`: ref 值同步
- `useTypescriptHappyCallback`: TypeScript 类型安全的回调

## 关键依赖与配置

### 内部依赖
- `@follow/shared`: 共享工具和类型
- `@follow/types`: TypeScript 类型定义
- `@follow/utils`: 通用工具函数

### 外部依赖
- **jotai**: `2.15.1` - 状态管理（主题原子）
- **foxact**: `0.2.49` - React Hooks 扩展库
- **usehooks-ts**: `3.1.1` - TypeScript React Hooks

### 开发依赖
- `@follow/configs`: 共享配置（TypeScript、ESLint 等）

## 核心设计模式

### 1. 主题管理系统
采用 Jotai 原子状态管理，支持：
- 系统主题跟随
- 手动主题切换
- 平滑主题过渡动画

### 2. 乐观更新架构
提供可配置的乐观更新策略：
- 变更队列管理
- 回滚机制
- 多种更新策略

### 3. 性能优化
- 防抖处理（滚动、尺寸变化）
- ResizeObserver 优化
- 内存泄漏防护

## API 使用示例

### 主题管理
```typescript
import { useIsDark, useSyncThemeWebApp } from "@follow/hooks"

function App() {
  const isDark = useIsDark()
  useSyncThemeWebApp() // 自动同步主题到 DOM

  return <div className={isDark ? "dark" : "light"}>
    {/* 应用内容 */}
  </div>
}
```

### 元素测量
```typescript
import { useMeasure } from "@follow/hooks"

function ResizableComponent() {
  const [ref, bounds] = useMeasure({
    debounce: 100,
    scroll: true
  })

  return (
    <div ref={ref}>
      宽度: {bounds.width}px, 高度: {bounds.height}px
    </div>
  )
}
```

### 乐观更新
```typescript
import { useOptimisticMutation, createOptimisticConfig } from "@follow/hooks"

const config = createOptimisticConfig({
  strategy: "queue",
  rollbackOnError: true
})

function LikeButton({ postId }) {
  const { mutate, isPending } = useOptimisticMutation(config)

  const handleLike = () => {
    mutate({
      action: "like",
      data: { postId }
    })
  }

  return <button onClick={handleLike} disabled={isPending}>
    点赞
  </button>
}
```

## 测试与质量

### 当前状态
- **测试覆盖**: ❌ 无单元测试
- **类型安全**: ✅ TypeScript 严格模式
- **文档覆盖**: ✅ JSDoc 注释

### 建议改进
1. 为核心 Hooks 添加单元测试
2. 添加性能基准测试
3. 补充使用示例和最佳实践文档

## 文件清单

### 主要源文件
- `src/index.ts` - 主导出文件
- `src/factory/createHTMLMediaHook.ts` - 媒体 Hook 工厂
- `src/internal/for-theme.ts` - 主题内部实现
- `src/optimistic/` - 乐观更新模块（5个文件）
- `src/use*.ts` - 各种 Hooks 实现（22个文件）

### 文件统计
- **总文件数**: 24 个 TypeScript 文件
- **Hooks 数量**: 22+ 个自定义 Hooks
- **代码行数**: 约 1500+ 行

## 变更记录 (Changelog)

- **2025-11-21** - 创建初始模块文档，分析所有 Hooks 功能

## 相关链接

- [@follow/components](../components/CLAUDE.md) - UI 组件库
- [@follow/utils](../utils/CLAUDE.md) - 工具函数库
- [@follow/types](../types/CLAUDE.md) - 类型定义
- [Jotai 文档](https://jotai.org/) - 状态管理库