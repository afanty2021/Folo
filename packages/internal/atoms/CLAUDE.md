# Atoms 模块文档

[根目录](../../../CLAUDE.md) > [packages](../../) > [internal](../) > **atoms**

## 模块职责

`@follow/atoms` 是 Folo 项目的 Jotai 原子状态管理包，提供细粒度的响应式状态原子，用于管理全局用户状态和设置等轻量级状态数据。

## 入口与启动

- **包类型**: ESM 模块
- **状态管理**: 基于 Jotai 库
- **导出方式**: 默认导出

## 主要功能模块

### 1. 用户状态原子 (User State Atoms)
**文件**: `src/atoms/user.ts`

#### 核心原子定义
- `whoami` - 当前用户信息原子
- `loginModalShow` - 登录弹窗显示状态原子

#### 用户信息原子
```typescript
interface UserInfo {
  id: string
  name: string | null
  image: string | null
  handle: string | null
  email?: string
}

export const [, , useWhoami, , whoami, setWhoami] = createAtomHooks(
  atom<Nullable<UserInfo>>()
)
```

#### 登录弹窗原子
```typescript
export const [, , useLoginModalShow, useSetLoginModalShow, getLoginModalShow, setLoginModalShow] =
  createAtomHooks(atom<boolean>(false))
```

### 2. 设置辅助函数 (Settings Helpers)
**文件**: `src/helper/setting.ts`
- 设置相关工具函数
- 状态持久化辅助

## 关键依赖与配置

### 核心依赖
- **jotai**: Jotai 状态管理库（通过 @follow/utils 间接依赖）
- **@follow/utils/jotai**: Jotai 工具函数

### 内部依赖
- `@follow/types`: TypeScript 类型定义

## 设计特点

### 1. 原子化状态管理
- 细粒度的状态原子
- 依赖追踪和更新优化
- 组件级别的状态订阅

### 2. 工具函数增强
- 统一的原子创建模式
- 自定义 Hooks 生成
- 类型安全保障

### 3. 轻量级设计
- 最小化的状态管理开销
- 简单的 API 接口
- 高性能的状态更新

## API 使用方式

### 用户状态管理
```typescript
import { useWhoami, setWhoami } from "@follow/atoms"

function UserProfile() {
  const user = useWhoami()

  const handleLogin = (userData: UserInfo) => {
    setWhoami(userData)
  }

  return (
    <div>
      {user ? (
        <div>Welcome, {user.name}</div>
      ) : (
        <button onClick={() => handleLogin({ id: "1", name: "John", image: null, handle: null })}>
          Login
        </button>
      )}
    </div>
  )
}
```

### 登录弹窗控制
```typescript
import { useLoginModalShow, setLoginModalShow } from "@follow/atoms"

function LoginButton() {
  const showModal = useLoginModalShow()

  return (
    <>
      <button onClick={() => setLoginModalShow(true)}>
        Login
      </button>

      {showModal && (
        <Modal onClose={() => setLoginModalShow(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  )
}
```

## 原子创建模式

### createAtomHooks 工具函数
```typescript
// 返回的元组：
// [atom, useAtom, useAtomValue, useSetAtom, getAtom, setAtom]

export const [, , useUser, , getUser, setUser] = createAtomHooks(
  atom<UserInfo | null>(null)
)
```

### 使用模式
- `useAtom`: 完整的原子访问和设置
- `useAtomValue`: 只读访问
- `useSetAtom`: 只写访问
- `getAtom`: 同步获取（非组件中）
- `setAtom`: 同步设置（非组件中）

## 状态持久化

### 设置辅助函数
```typescript
import { createPersistentAtom } from "@follow/atoms/helper/setting"

// 持久化原子设置
const [themeAtom, useTheme, setTheme] = createPersistentAtom(
  "theme", // 存储键
  "light", // 默认值
  localStorage // 存储介质
)
```

## 最佳实践

### 1. 原子设计原则
- 保持原子简单和专注
- 避免原子间的直接依赖
- 使用派生原子处理复杂逻辑

### 2. 性能优化
- 合理使用 useAtomValue 和 useSetAtom
- 避免不必要的状态订阅
- 使用 atomWithReset 处理重置需求

### 3. 类型安全
- 定义明确的原子类型
- 使用 TypeScript 进行类型检查
- 避免 any 类型的使用

## 扩展指南

### 添加新原子
```typescript
import { createAtomHooks } from "@follow/utils/jotai"
import { atom } from "jotai"

// 应用设置原子
export const [, , useAppSettings, , getAppSettings, setAppSettings] =
  createAtomHooks(atom<AppSettings>(defaultSettings))

// 通知原子
export const [, , useNotifications, , getNotifications, setNotifications] =
  createAtomHooks(atom<Notification[]>([]))
```

### 复杂状态管理
```typescript
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

// 带持久化的原子
export const preferencesAtom = atomWithStorage("preferences", defaultPreferences)

// 派生原子
export const themeAtom = atom(
  (get) => get(preferencesAtom).theme,
  (get, set, newTheme) => {
    set(preferencesAtom, {
      ...get(preferencesAtom),
      theme: newTheme
    })
  }
)
```

## 文件清单

### 核心文件
- `src/atoms/user.ts` - 用户状态原子（19行）
- `src/helper/setting.ts` - 设置辅助函数

### 文件统计
- **总文件数**: 2 个 TypeScript 文件
- **代码行数**: 约 30+ 行
- **原子数量**: 2 个主要原子
- **工具函数**: 1 个辅助模块

## 变更记录 (Changelog)

- **2025-11-21** - 创建初始模块文档，分析原子状态管理

## 相关链接

- [@follow/store](../store/CLAUDE.md) - 状态管理
- [@follow/hooks](../hooks/CLAUDE.md) - React Hooks
- [@follow/utils](../utils/CLAUDE.md) - 工具函数库
- [Jotai 文档](https://jotai.org/) - 原子状态管理

## 架构定位

### 在状态管理中的角色
```
Complex State (Zustand Store)
    ↓
Global State (Jotai Atoms)
    ↓
Component State (React State)
```

### 与其他状态管理的关系
- **Jotai Atoms**: 轻量级全局状态
- **Zustand Store**: 复杂业务状态
- **React State**: 组件内部状态

## 未来扩展

### 计划添加的原子
- 应用主题设置
- 用户偏好配置
- 通知系统状态
- 应用功能开关

### 功能增强
- 原子持久化机制
- 状态同步优化
- 调试工具集成