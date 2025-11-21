# Configs 模块文档

[根目录](../../../CLAUDE.md) > [packages](../../) > **configs**

## 模块职责

`@follow/configs` 是 Folo 项目的配置管理包，提供统一的构建配置、样式配置和开发工具配置，确保整个项目的开发体验和构建一致性。

## 入口与启动

- **包版本**: `0.0.1`
- **包类型**: ESM 模块
- **子路径导出**:
  - `./tailwindcss/web` - Web 端 Tailwind CSS 配置
  - `./tsconfig.extend.json` - TypeScript 扩展配置

## 主要功能模块

### 1. Tailwind CSS 配置 (Tailwind Configuration)
**文件**: `tailwindcss/web.ts`

#### 核心特性
- **暗色模式支持**: 类名和属性双重模式
- **自定义字体系统**: iOS 风格的字体大小定义
- **主题色彩系统**: CSS 变量驱动的颜色管理
- **图标系统**: 集成多个图标库
- **响应式设计**: 容器查询和断点配置

#### 字体系统
```typescript
fontSize: {
  largeTitle: ["1.625rem", "2rem"],    // 26px
  title1: ["1.375rem", "1.625rem"],     // 22px
  title2: ["1.0625rem", "1.375rem"],    // 17px
  title3: ["0.9375rem", "1.25rem"],     // 15px
  headline: ["0.8125rem", "1rem"],      // 13px
  body: ["0.8125rem", "1rem"],          // 13px
  callout: ["0.75rem", "0.9375rem"],    // 12px
  subheadline: ["0.6875rem", "0.875rem"], // 11px
  footnote: ["0.625rem", "0.8125rem"],  // 10px
  caption: ["0.625rem", "0.8125rem"],   // 10px
}
```

#### 颜色系统
```typescript
colors: {
  border: "hsl(var(--border) / <alpha-value>)",
  background: "hsl(var(--background) / <alpha-value>)",
  accent: "hsl(var(--fo-a) / <alpha-value>)",
  folo: "#FF5C00", // 品牌色

  theme: {
    item: {
      active: "var(--fo-item-active)",
      hover: "var(--fo-item-hover)",
    },
    selection: {
      active: "var(--fo-selection-active)",
      hover: "var(--fo-selection-hover)",
      foreground: "var(--fo-selection-foreground)",
    },
    // ...
  }
}
```

### 2. TypeScript 配置 (TypeScript Configuration)
**文件**: `tsconfig.extend.json`

#### 编译选项
```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "jsx": "preserve",
    "moduleResolution": "Bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true
  }
}
```

## 插件生态系统

### 1. 图标插件
- **@egoist/tailwindcss-icons**: 图标系统支持
- **@iconify-json/mingcute**: Mingcute 图标集
- **@iconify-json/simple-icons**: 简单图标集
- **@iconify-json/logos**: 品牌标识图标

### 2. 功能插件
- **tailwindcss-animate**: 动画支持
- **@tailwindcss/container-queries**: 容器查询
- **@tailwindcss/typography**: 排版样式
- **tailwindcss-motion**: 运动效果
- **tailwindcss-safe-area**: 安全区域
- **tailwindcss-multi**: 多重类名
- **tailwindcss-uikit-colors**: UI 颜色系统

### 3. 自定义插件
- **ratio-mixing-plugin**: 颜色混合工具
- **tailwind-extend.css**: CSS 扩展

## 关键依赖与配置

### 核心依赖
- **@egoist/tailwindcss-icons**: `1.9.0` - 图标插件
- **@tailwindcss/container-queries**: `0.1.1` - 容器查询
- **@tailwindcss/typography**: `0.5.19` - 排版插件
- **tailwindcss-animate**: `1.0.7` - 动画插件
- **es-toolkit**: `1.41.0` - 工具库

### 图标依赖
- **@iconify/tools**: `4.1.4` - 图标工具
- **@iconify/utils**: `3.0.2` - 图标工具
- **@iconify-json/mingcute**: `1.2.5` - Mingcute 图标
- **@iconify-json/simple-icons**: `1.2.57` - 简单图标
- **@iconify-json/logos**: `1.2.10` - 品牌图标

### 对等依赖
- **tailwindcss**: `>=3 || <4` - CSS 框架

## 设计特点

### 1. 设计系统化
- 统一的字体规范
- 一致的颜色系统
- 标准化的间距和尺寸

### 2. 开发体验优化
- TypeScript 严格模式
- 完整的类型检查
- 现代化的构建工具链

### 3. 平台适配
- 响应式设计支持
- 移动端优化
- 暗色模式支持

### 4. 可扩展性
- 模块化的插件系统
- 灵活的配置扩展
- 自定义主题支持

## 使用方式

### 1. Tailwind 配置集成
```typescript
// tailwind.config.js
import { extendConfig } from "@follow/configs/tailwindcss/web"

export default extendConfig({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  // 自定义配置
})
```

### 2. TypeScript 配置扩展
```json
// tsconfig.json
{
  "extends": ["@follow/configs/tsconfig.extend.json"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 3. 样式使用
```typescript
// 使用自定义字体
<div className="text-largeTitle font-semibold">标题</div>

// 使用主题颜色
<div className="bg-theme-background border-theme-item-hover">
  内容
</div>

// 使用图标
<div className="i-mgc-home-cute-fi text-2xl">首页图标</div>
```

## 图标系统

### 1. 集成的图标库
- **Mingcute**: 精美的线条图标
- **Simple Icons**: 品牌和社交媒体图标
- **Logos**: 公司和产品标识

### 2. 自定义图标处理
- SVG 优化和清理
- 颜色标准化
- 自动 `currentColor` 应用

### 3. 图标使用方式
```typescript
// 使用集成图标
<i className="i-mgc-home-cute-fi" />
<i className="i-simple-icons-github" />
<i className="i-logos-react" />

// 自定义图标（在 icons/mgc 目录）
<i className="i-mgc-custom-icon" />
```

## 主题系统

### 1. CSS 变量驱动
```css
:root {
  --fo-background: 255 255 255;
  --fo-item-active: 59 130 246;
  --fo-a: 255 92 0;
}

[data-theme="dark"] {
  --fo-background: 17 24 39;
  --fo-item-active: 96 165 250;
}
```

### 2. 主题切换
```typescript
// 使用 Tailwind 的暗色模式
<div className="dark:bg-gray-900 light:bg-white">
  响应主题变化的内容
</div>

// 使用自定义主题变量
<div className="bg-[hsl(var(--background))]">
  使用 CSS 变量的背景
</div>
```

## 构建优化

### 1. Tree-shaking 支持
- 按需加载图标
- 未使用样式移除
- 包大小优化

### 2. 开发体验
- 热重载支持
- 类型安全检查
- 错误提示优化

### 3. 生产优化
- CSS 压缩
- 图标内联优化
- 缓存策略

## 文件清单

### 核心文件
- `tailwindcss/web.ts` - Web 端 Tailwind 配置（209行）
- `tsconfig.extend.json` - TypeScript 扩展配置（20行）

### 支持文件
- `tailwindcss/tw-css-plugin` - CSS 插件（引入）
- `tailwindcss/ratio-mixing-plugin` - 颜色混合插件
- `tailwindcss/tailwind-extend.css` - CSS 扩展

### 图标资源
- `icons/mgc/` - 自定义 Mingcute 图标目录

### 文件统计
- **总文件数**: 5+ 个配置文件
- **代码行数**: 约 250+ 行
- **插件数量**: 8+ 个 Tailwind 插件
- **图标集合**: 4 个图标库

## 变更记录 (Changelog)

- **2025-11-21** - 创建初始模块文档，分析配置管理系统
- **版本**: 0.0.1 - 初始版本

## 相关链接

- [@follow/utils](../internal/utils/CLAUDE.md) - 工具函数库
- [@follow/components](../internal/components/CLAUDE.md) - UI 组件库
- [Tailwind CSS 文档](https://tailwindcss.com/docs) - CSS 框架文档
- [Iconify 文档](https://iconify.design/) - 图标系统文档

## 最佳实践

### 1. 配置管理
- 继承基础配置，避免重复
- 合理使用 CSS 变量
- 保持配置的可维护性

### 2. 样式开发
- 优先使用设计系统变量
- 遵响应式设计原则
- 注意暗色模式兼容性

### 3. 图标使用
- 选择语义化的图标
- 保持图标风格一致性
- 注意可访问性支持

## 扩展指南

### 1. 添加新插件
```typescript
// 在 tailwind.config.js 中扩展
export default extendConfig({
  plugins: [
    // 新插件
    require("tailwindcss-new-plugin")
  ]
})
```

### 2. 自定义主题
```typescript
// 扩展颜色系统
export default extendConfig({
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#your-color",
          secondary: "#your-color",
        }
      }
    }
  }
})
```

### 3. 添加新图标
1. 将 SVG 文件放入 `icons/mgc/` 目录
2. 重新构建项目
3. 使用 `i-mgc-filename` 类名