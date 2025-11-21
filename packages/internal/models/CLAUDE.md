# Models 模块文档

[根目录](../../../CLAUDE.md) > [packages](../../) > [internal](../) > **models**

## 模块职责

`@follow/models` 是 Folo 项目的数据模型定义包，专注于提供类型安全的数据结构定义，特别是 RSSHub 路由模型和通用的数据类型定义。

## 入口与启动

- **主入口文件**: `src/index.ts`
- **子路径导出**:
  - `.` - 主模块导出
  - `./rsshub` - RSSHub 相关模型
  - `./types` - 通用类型定义
- **类型检查**: `pnpm typecheck`

## 主要功能模块

### 1. RSSHub 路由模型 (RSSHub Route Models)
**文件**: `src/rsshub.ts`

#### 核心类型定义
- `RSSHubRouteType` - RSSHub 路由类型映射
- `RSSHubRouteDeclaration` - RSSHub 路由声明
- `RSSHubRoute` - RSSHub 路由详细定义
- `RSSHubParameter` - RSSHub 参数类型
- `RSSHubParameterObject` - RSSHub 参数对象

#### RSSHub 路由结构
```typescript
interface RSSHubRoute {
  path: string                    // 路由路径
  categories: string[]           // 分类标签
  example: string                // 示例 URL
  parameters: Record<string, RSSHubParameter>  // 参数定义
  name: string                   // 路由名称
  maintainers: string[]          // 维护者列表
  location: string               // 地理位置
  description: string            // 路由描述
  view?: FeedViewType           // 推荐视图类型
  heat?: number                 // 热度指标
  topFeeds?: FeedDiscoveryResult[]  // 热门订阅源
}
```

#### 参数定义
```typescript
type RSSHubParameter = string | RSSHubParameterObject

interface RSSHubParameterObject {
  description: string           // 参数描述
  default: string | null        // 默认值
  options?: {                  // 可选值列表
    label: string
    value: string
  }[]
}
```

### 2. 通用类型定义 (Common Types)
**文件**: `src/types.ts`
- 当前为空文件，预留扩展

### 3. 主模块导出 (Main Module)
**文件**: `src/index.ts`
- 当前为空导出，作为包的统一入口点

## 关键依赖与配置

### 内部依赖
- `@follow/constants`: 常量定义（FeedViewType）
- `@follow/shared`: 共享工具和类型
- `@follow/types`: TypeScript 类型定义
- `@follow/utils`: 工具函数库

### 外部依赖
- `@follow-app/client-sdk`: 客户端 SDK（FeedDiscoveryResult）

### 开发依赖
- `@follow/configs`: 共享配置

## 设计特点

### 1. 类型安全优先
- 严格的 TypeScript 类型定义
- 完整的接口描述
- 类型约束和验证

### 2. RSSHub 集成
- 完整的 RSSHub 路由模型
- 参数化配置支持
- 热度和推荐机制

### 3. 扩展性设计
- 模块化类型定义
- 预留扩展空间
- 统一的导出接口

## API 使用示例

### RSSHub 路由定义
```typescript
import type { RSSHubRouteDeclaration } from "@follow/models/rsshub"

const routeDeclaration: RSSHubRouteDeclaration = {
  name: "GitHub",
  url: "https://github.com",
  routes: {
    "/user/:username": {
      path: "/user/:username",
      categories: ["social", "programming"],
      example: "/user/octocat",
      parameters: {
        username: {
          description: "GitHub 用户名",
          default: null
        }
      },
      name: "用户动态",
      maintainers: ["DIYgod"],
      location: "global",
      description: "获取 GitHub 用户的公开动态",
      view: 1, // FeedViewType.Articles
      heat: 85
    }
  }
}
```

### 参数处理
```typescript
import type { RSSHubParameterObject } from "@follow/models/rsshub"

const parameter: RSSHubParameterObject = {
  description: "语言选择",
  default: "en",
  options: [
    { label: "英文", value: "en" },
    { label: "中文", value: "zh" },
    { label: "日文", value: "ja" }
  ]
}
```

### 类型安全使用
```typescript
import type { RSSHubRoute, FeedViewType } from "@follow/models/rsshub"

function processRoute(route: RSSHubRoute) {
  // 完全类型安全的路由处理
  const categories = route.categories
  const view: FeedViewType | undefined = route.view

  if (view === FeedViewType.Videos) {
    // 视频类型特殊处理
  }
}
```

## 数据流设计

### 1. RSSHub 集成流程
```
RSSHub Route Definition
    ↓
Type Safety Validation
    ↓
Parameter Processing
    ↓
URL Generation
    ↓
Feed Discovery
```

### 2. 类型系统架构
```
Base Types (@follow/types)
    ↓
Constants (@follow/constants)
    ↓
Models (@follow/models)
    ↓
Business Logic (Store/Services)
```

## 扩展建议

### 1. 即将添加的类型定义
- 通用数据模型接口
- API 响应类型
- 配置对象类型
- 错误类型定义

### 2. 建议的功能增强
- 数据验证器
- 类型转换工具
- Mock 数据生成器
- Schema 定义

## 测试与质量

### 当前状态
- **测试覆盖**: ❌ 无单元测试
- **类型安全**: ✅ 完整的 TypeScript 覆盖
- **文档覆盖**: ✅ 类型自文档化
- **代码质量**: ✅ 清晰的接口设计

### 建议改进
1. 添加类型单元测试
2. 完善 JSDoc 注释
3. 添加使用示例
4. 补充数据验证逻辑

## 文件清单

### 核心文件
- `src/index.ts` - 主模块导出（空导出）
- `src/rsshub.ts` - RSSHub 路由模型定义（34行）
- `src/types.ts` - 通用类型定义（空文件）

### 导出结构
```typescript
// 主导出
export {} from "./index"

// 子路径导出
export * from "./rsshub"
export * from "./types"
```

### 文件统计
- **总文件数**: 3 个 TypeScript 文件
- **代码行数**: 约 40 行
- **类型定义**: 6 个主要类型
- **导出路径**: 3 个导出路径

## 变更记录 (Changelog)

- **2025-11-21** - 创建初始模块文档，分析 RSSHub 模型定义

## 相关链接

- [@follow/types](../types/CLAUDE.md) - TypeScript 类型定义
- [@follow/constants](../constants/CLAUDE.md) - 常量定义
- [@follow/shared](../shared/CLAUDE.md) - 共享工具
- [RSSHub 文档](https://docs.rsshub.app/) - RSSHub 路由规则
- [TypeScript 文档](https://www.typescriptlang.org/) - TypeScript 类型系统

## 路线图

### 短期计划
- [ ] 添加基础数据模型定义
- [ ] 完善 RSSHub 类型支持
- [ ] 添加单元测试

### 中期计划
- [ ] 扩展通用类型库
- [ ] 添加数据验证器
- [ ] 完善文档和示例

### 长期计划
- [ ] Schema 生成工具
- [ ] Mock 数据生成
- [ ] 类型检查工具