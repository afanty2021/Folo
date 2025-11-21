# Types 模块文档

[根目录](../../../CLAUDE.md) > [packages](../../) > [internal](../) > **types**

## 模块职责

`@follow/types` 是 Folo 项目的全局 TypeScript 类型定义包，提供项目级别的类型声明、全局类型工具和环境变量定义，确保整个项目的类型安全性和一致性。

## 入口与启动

- **包结构**: 纯类型定义包，无运行时代码
- **导出方式**: 声明文件导出
- **子路径导出**:
  - `./global` - 全局类型定义
  - `./react` - React 组件类型扩展
  - `./vite` - Vite 环境变量类型

## 主要功能模块

### 1. 全局类型工具 (Global Type Utilities)
**文件**: `global.d.ts`

#### 核心类型工具
- `Nullable<T>` - 可空类型（T | null | undefined）
- `IsLiteralString<T>` - 字符串字面量类型检测
- `OmitStringType<T>` - 移除字符串类型的类型工具
- `NonUndefined<T>` - 移除 undefined 的类型工具
- `NilValue` - 空值类型（null | undefined | false | ""）
- `Prettify<T>` - 类型美化工具

#### 类型工具详解
```typescript
// 可空类型
type Example1 = Nullable<string>  // string | null | undefined

// 字符串字面量检测
type Example2 = IsLiteralString<"hello">  // "hello"
type Example3 = IsLiteralString<string>   // never

// 非undefined类型
type Example4 = NonUndefined<{ name?: string; age: number }>
// 结果: { name?: string | undefined; age: number }

// 空值类型
type Example5 = NilValue  // null | undefined | false | ""

// 类型美化
type Example6 = Prettify<{ a: 1 } & { b: 2 }>
// 结果: { a: 1; b: 2 }
```

### 2. React 组件类型扩展 (React Component Types)
**文件**: `react-global.d.ts`

#### 组件类型定义
- `Component<P>` - 基础组件类型
- `ComponentWithRef<P, Ref>` - 带 ref 的组件类型
- `ComponentType<P>` - 组件属性类型

#### CSS-in-JS 支持
- `tw()` - Tailwind CSS 宏函数（构建时替换）

#### React Aria 扩展
```typescript
declare module "react" {
  export interface AriaAttributes {
    "data-testid"?: string
    "data-hide-in-print"?: boolean
  }
}
```

#### 组件类型使用
```typescript
// 基础组件
const MyComponent: Component<{ title: string }> = ({ title, children }) => {
  return <div>{title}{children}</div>
}

// 带 ref 的组件
const InputComponent: ComponentWithRef<{ value: string }, HTMLInputElement> =
  ({ value, ref, ...props }) => {
    return <input ref={ref} value={value} {...props} />
}

// Tailwind 宏使用
const className = tw`px-4 py-2 bg-blue-500 text-white`
```

### 3. Vite 环境变量类型 (Vite Environment Types)
**文件**: `vite-env.d.ts`

#### 环境变量定义
- `VITE_WEB_URL` - Web 应用 URL
- `VITE_API_URL` - API 服务 URL
- `VITE_SENTRY_DSN` - Sentry 错误追踪 DSN
- `VITE_OPENPANEL_CLIENT_ID` - OpenPanel 客户端 ID
- `VITE_OPENPANEL_API_URL` - OpenPanel API URL
- `VITE_FIREBASE_CONFIG` - Firebase 配置

#### 环境变量使用
```typescript
// 类型安全的环境变量访问
const apiUrl = import.meta.env.VITE_API_URL
const webUrl = import.meta.env.VITE_WEB_URL

// 编译时类型检查
// 如果访问未定义的环境变量，TypeScript 会报错
const invalidVar = import.meta.env.VITE_UNDEFINED_VAR // ❌ 编译错误
```

## 设计特点

### 1. 渐进式类型系统
- 基础类型工具可复用
- 组件类型标准化
- 环境变量类型安全

### 2. 开发体验优化
- 类型提示和自动补全
- 编译时错误检查
- IDE 支持最大化

### 3. 跨环境兼容
- 支持 Vite 构建工具
- React 生态集成
- TypeScript 模块扩展

## 类型系统架构

### 1. 类型层次结构
```
Global Type Utils (global.d.ts)
    ↓
Component Types (react-global.d.ts)
    ↓
Environment Types (vite-env.d.ts)
    ↓
Business Types (各业务模块)
```

### 2. 类型组合模式
```typescript
// 基础类型工具
type SafeString = NonUndefined<Nullable<string>>

// 组件类型组合
type ButtonProps = ComponentWithRef<{
  variant: "primary" | "secondary"
  onClick?: () => void
}, HTMLButtonElement>

// 环境相关类型
type AppConfig = {
  apiUrl: typeof import.meta.env.VITE_API_URL
  webUrl: typeof import.meta.env.VITE_WEB_URL
}
```

### 3. 模块扩展机制
- TypeScript 模块扩展
- React 接口增强
- Vite 环境类型声明

## 配置和使用

### 1. 项目配置
在 `tsconfig.json` 中包含类型定义：
```json
{
  "compilerOptions": {
    "types": ["vite/client"]
  }
}
```

### 2. 导入方式
```typescript
// 全局类型（无需导入）
const value: Nullable<string> = null

// React 组件类型（全局可用）
const MyComponent: Component<{ title: string }> = ({ title }) => {
  return <div>{title}</div>
}

// 环境变量（通过 import.meta.env）
const apiUrl = import.meta.env.VITE_API_URL
```

### 3. 扩展新类型
```typescript
// 在业务模块中扩展现有类型
declare global {
  interface Window {
    myCustomProperty: string
  }
}
```

## 最佳实践

### 1. 类型定义原则
- 优先使用类型工具组合
- 避免类型断言
- 保持类型可读性

### 2. 组件类型设计
- 使用标准化的组件类型
- 合理使用泛型
- 保持 Props 接口简洁

### 3. 环境变量管理
- 所有环境变量都要类型声明
- 使用 VITE_ 前缀
- 提供默认值处理

## 性能考虑

### 1. 编译时优化
- 纯类型定义，零运行时开销
- 类型推断优化
- Tree-shaking 友好

### 2. 开发体验
- 快速类型检查
- IDE 智能提示
- 错误信息清晰

## 测试与质量

### 当前状态
- **测试覆盖**: N/A（纯类型包）
- **类型安全**: ✅ 完整的 TypeScript 覆盖
- **文档覆盖**: ✅ 类型自文档化
- **代码质量**: ✅ 遵循 TypeScript 最佳实践

### 质量保证
- TypeScript 编译检查
- ESLint 类型规则
- 代码审查标准

## 文件清单

### 核心文件
- `global.d.ts` - 全局类型工具定义（19行）
- `react-global.d.ts` - React 组件类型扩展（32行）
- `vite-env.d.ts` - Vite 环境变量类型（15行）

### 导出结构
```typescript
// 包声明
declare module "@follow/types/global"
declare module "@follow/types/react"
declare module "@follow/types/vite"
```

### 文件统计
- **总文件数**: 3 个声明文件
- **代码行数**: 约 66 行
- **类型定义**: 10+ 个主要类型
- **环境变量**: 7 个配置项

## 变更记录 (Changelog)

- **2025-11-21** - 创建初始模块文档，分析类型定义结构

## 相关链接

- [TypeScript 文档](https://www.typescriptlang.org/) - TypeScript 官方文档
- [React TypeScript](https://react-typescript-cheatsheet.netlify.app/) - React TypeScript 指南
- [Vite 环境变量](https://vitejs.dev/guide/env-and-mode.html) - Vite 环境配置
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架

## 维护指南

### 添加新类型
1. 在合适的文件中添加类型定义
2. 确保类型通用性和可复用性
3. 添加使用示例和文档

### 环境变量更新
1. 在 `vite-env.d.ts` 中添加新变量类型
2. 更新 `.env.example` 文件
3. 通知相关开发者

### React 组件类型扩展
1. 在 `react-global.d.ts` 中扩展
2. 保持向后兼容性
3. 提供迁移指南