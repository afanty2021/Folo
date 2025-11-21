# Components 组件库模块

[根目录](../../../CLAUDE.md) > [packages](../../) > [internal](../) > **components**

## 模块职责

提供统一的 UI 组件库，支持跨平台复用。基于 React + Tailwind CSS，包含基础 UI 组件、复杂业务组件、图标系统、样式规范等，确保设计一致性和开发效率。

## 入口与启动

### 主入口
- **文件**: `exports.ts`
- **功能**: 组件库统一导出和类型定义

### 样式入口
- **文件**: `assets/index.css`
- **功能**: Tailwind CSS 配置和全局样式

## 对外接口

### 组件导出
```typescript
// 主要组件
export * from './src/ui'
export * from './src/modules'
export * from './src/common'

// 工具和 Hooks
export * from './src/hooks'
export * from './src/utils'
export * from './src/providers'

// 图标和资源
export * from './src/icons'
export * from './assets/*'
```

### 核心组件分类
- **UI 组件** (`src/ui/`): 基础界面组件
- **业务组件** (`src/modules/`): 复杂业务逻辑组件
- **通用组件** (`src/common/`): 跨平台通用组件
- **图标系统** (`src/icons/`): SVG 图标组件

## 关键依赖与配置

### UI 框架
```json
{
  "@radix-ui/react-accordion": "1.2.12",
  "@radix-ui/react-avatar": "1.1.11",
  "@radix-ui/react-dialog": "1.1.15",
  "@radix-ui/react-dropdown-menu": "2.1.16",
  "@radix-ui/react-select": "2.2.6",
  "@radix-ui/react-tabs": "1.1.13",
  "@radix-ui/react-toast": "1.2.15"
}
```

### 动画和交互
```json
{
  "motion": "12.23.24",
  "react-fast-marquee": "1.6.5",
  "vaul": "1.1.2"
}
```

### 内容渲染
```json
{
  "@lexical/react": "0.38.2",
  "react-blurhash": "0.3.0",
  "masonic": "4.1.0"
}
```

### 样式系统
```json
{
  "tailwindcss-uikit-colors": "catalog:",
  "class-variance-authority": "0.7.1"
}
```

## 组件架构

### 设计系统
- **颜色系统**: 统一的调色板和主题
- **字体系统**: 响应式字体和排版
- **间距系统**: 一致的间距和布局
- **动画系统**: 流畅的过渡和微交互

### 组件特性
- **跨平台兼容**: Web、移动端、桌面端适配
- **主题支持**: 明暗主题切换
- **响应式设计**: 适配不同屏幕尺寸
- **无障碍支持**: ARIA 标签和键盘导航
- **国际化支持**: 多语言文本和 RTL 支持

## 测试与质量

### 测试文件
- 组件单元测试
- 视觉回归测试
- 交互测试
- 可访问性测试

### 质量工具
- **Storybook**: 组件文档和测试
- **Chrome DevTools**: 性能和样式调试
- **React DevTools**: 组件状态调试

## 常见问题 (FAQ)

### Q: 如何创建新组件？
A:
1. 在合适的目录下创建组件文件
2. 遵循现有的命名和结构规范
3. 添加 TypeScript 类型定义
4. 编写测试用例和文档

### Q: 如何处理跨平台样式？
A: 使用 Tailwind CSS 的响应式前缀和平台特定的样式类，结合条件渲染。

### Q: 如何优化组件性能？
A:
1. 使用 React.memo 优化重渲染
2. 合理使用 useCallback 和 useMemo
3. 懒加载重型组件
4. 使用虚拟化处理长列表

### Q: 如何实现主题切换？
A: 使用 CSS 变量 + Tailwind CSS 的主题系统，配合 Context Provider。

## 相关文件清单

### 核心文件
- `exports.ts` - 主入口
- `assets/index.css` - 样式入口
- `package.json` - 依赖配置

### 组件目录
- `src/ui/` - 基础 UI 组件
- `src/modules/` - 业务组件
- `src/common/` - 通用组件
- `src/icons/` - 图标组件
- `src/hooks/` - 自定义 Hooks
- `src/utils/` - 工具函数
- `src/providers/` - Context Providers

### 资源文件
- `assets/` - 静态资源
- `assets/svg/` - SVG 图标
- `assets/css/` - CSS 样式文件

## 开发指南

### 本地开发
```bash
# 进入目录
cd packages/internal/components

# 类型检查
pnpm run typecheck

# 启动 Storybook
npm run storybook

# 构建组件
npm run build
```

### 组件开发规范
1. **命名规范**: PascalCase 组件名，kebab-case 文件名
2. **类型定义**: 完整的 Props 接口和默认值
3. **文档注释**: JSDoc 注释描述组件用法
4. **测试覆盖**: 单元测试和交互测试

### 样式指南
1. **Tailwind 优先**: 优先使用 Tailwind CSS 类
2. **CSS 变量**: 主题相关的样式使用 CSS 变量
3. **响应式**: 使用 Tailwind 响应式前缀
4. **状态样式**: 使用 class-variance-authority 管理变体

## 组件分类

### 基础 UI 组件
- **Button**: 按钮组件，支持多种样式和状态
- **Input**: 输入框组件，支持验证和格式化
- **Modal**: 模态框组件，支持多层嵌套
- **Tooltip**: 工具提示组件，支持多种位置
- **Dropdown**: 下拉菜单组件，支持搜索和多选

### 业务组件
- **FeedCard**: 订阅源卡片组件
- **EntryItem**: 文章条目组件
- **UserAvatar**: 用户头像组件
- **AudioPlayer**: 音频播放器组件
- **ImageViewer**: 图片查看器组件

### 布局组件
- **Container**: 容器组件
- **Grid**: 网格布局组件
- **Stack**: 堆叠布局组件
- **Sidebar**: 侧边栏组件

## 图标系统

### 图标来源
- **MingCute**: 主要图标库
- **Simple Icons**: 品牌图标
- **Custom**: 自定义业务图标

### 图标使用
```typescript
import { iAdd, iFollow, iSettings } from '@follow/components/icons'

function Component() {
  return <iAdd className="w-5 h-5" />
}
```

## 主题系统

### 颜色系统
- **主色调**: 蓝色系
- **语义色**: 成功、警告、错误、信息
- **中性色**: 灰色系用于文本和边框
- **表面色**: 背景和卡片颜色

### 暗色主题
- 自动检测系统主题偏好
- 平滑的主题切换动画
- 保持良好的对比度

## 变更记录 (Changelog)

- **2025-11-21 08:18:00** - 初始化组件库文档，定义组件架构和设计系统