# Utils 模块文档

[根目录](../../../CLAUDE.md) > [packages](../../) > [internal](../) > **utils**

## 模块职责

`@follow/utils` 是 Folo 项目的核心工具函数库，提供了经过优化的通用工具函数，涵盖字符串处理、DOM 操作、数据处理、平台检测、样式处理等多个方面。

## 入口与启动

- **主入口文件**: `src/index.ts`
- **包导出**: 支持子路径导出（`import { cn } from "@follow/utils"` 或 `import { cn } from "@follow/utils/utils"`）
- **测试命令**: `pnpm test`
- **类型检查**: `pnpm typecheck`
- **测试配置**: `vitest.config.ts`

## 主要功能模块

### 1. 样式与类名处理 (Styling & Classes)
- `cn()`: Tailwind CSS 类名合并，支持自定义扩展
- `clsx`: 条件类名处理

### 2. 平台与环境检测 (Platform & Environment)
- `getOS()`: 获取操作系统（macOS、iOS、Windows、Android、Linux）
- `detectBrowser()`: 浏览器检测
- `isSafari()`: Safari 浏览器检测
- `getMobilePlatform()`: 移动平台检测
- `isMobileDevice()`: 移动设备检测

### 3. DOM 操作与事件 (DOM Manipulation & Events)
- `nextFrame()`: 下一帧执行
- `asyncableNextFrame()`: 异步下一帧
- `stopPropagation()`: 停止事件冒泡
- `preventDefault()`: 阻止默认行为
- `composeEventHandlers()`: 事件处理器组合
- `findElementInShadowDOM()`: Shadow DOM 元素查找
- `checkIsEditableElement()`: 可编辑元素检测

### 4. 数据结构与缓存 (Data Structures & Caching)
- `LRUCache<K, V>`: 最近最少使用缓存实现
- `Set`: 扩展的 Set 数据结构工具

### 5. 字符串与文本处理 (String & Text Processing)
- `isASCII()`: ASCII 字符检测
- `formatXml()`: XML 格式化
- `capitalizeFirstLetter()`: 首字母大写
- `sortByAlphabet()`: 中英文混合排序
- `doesTextContainHTML()`: HTML 内容检测
- `duplicateIfLengthLessThan()`: 字符串重复填充

### 6. 数值与时间处理 (Numbers & Time)
- `toScientificNotation()`: 科学计数法格式化
- `formatNumber()`: 数字格式化（K、M、B）
- `formatTimeToSeconds()`: 时间字符串转秒数
- `timeStringToSeconds()`: 时间字符串解析
- `formatEstimatedMins()`: 分钟数格式化
- `clamp()`: 数值范围限制

### 7. URL 与网络处理 (URL & Network)
- `parseSafeUrl()`: 安全 URL 解析
- `resolveUrlWithBase()`: 基于 Base URL 解析
- `getUrlIcon()`: 获取网站图标
- `getAvatarUrl()`: 获取头像 URL
- `parseUrl`: 使用 tldts 解析 URL

### 8. 对象与数据处理 (Object & Data Processing)
- `omitObjectUndefinedValue()`: 移除 undefined 值
- `isEmptyObject()`: 空对象检测
- `shallowCopy()`: 浅拷贝
- `omitShallow()`: 浅层属性移除
- `combineCleanupFunctions()`: 清理函数组合

### 9. ID 与标识符 (IDs & Identifiers)
- `isBizId()`: 业务 ID 验证（雪花 ID）
- `nanoid`: 短 ID 生成（通过 nanoid 库）

### 10. 键盘与快捷键 (Keyboard & Shortcuts)
- `transformShortcut()`: 快捷键转换（跨平台）
- `sortShortcutKeys()`: 快捷键排序
- `isKeyForMultiSelectPressed()`: 多选按键检测

### 11. 颜色与视觉 (Color & Visual)
- `uniqolor`: 唯一颜色生成
- 颜色工具函数

### 12. 国际化与本地化 (i18n & Localization)
- `cjk`: 中日韩文本处理
- `language`: 语言检测与处理
- 本地化数字格式化

### 13. 编程语言特定功能 (Language-specific)
- `bindThis()`: this 绑定工具
- `chain()`: 链式调用
- `json-codec`: JSON 编解码
- `noop`: 空操作函数

### 14. React 专用 (React-specific)
- React 相关工具函数
- 组件辅助函数

### 15. 特殊功能 (Special Features)
- `duration()`: 时间段处理
- `environment()`: 环境变量处理
- `event-bus`: 事件总线（Web/React Native）
- `headers`: HTTP 头处理
- `html`: HTML 处理
- `img-proxy`: 图片代理处理
- `jotai`: Jotai 状态管理辅助
- `link-parser`: 链接解析
- `path-parser`: 路径解析
- `resize`: 尺寸调整
- `scroller`: 滚动处理
- `url-builder`: URL 构建
- `url-for-video`: 视频 URL 处理

## 关键依赖与配置

### 内部依赖
- `@follow/shared`: 共享常量和工具
- `@follow/types`: TypeScript 类型定义

### 外部依赖
- **clsx**: `2.1.1` - 条件类名处理
- **tailwind-merge**: `3.3.1` - Tailwind CSS 类名合并
- **nanoid**: `5.1.6` - 短 ID 生成
- **dompurify**: `3.3.0` - HTML 清理
- **@mozilla/readability**: `0.6.0` - 可读性解析
- **chardet**: `2.1.1` - 字符编码检测
- **motion**: `12.23.24` - 动画库
- **path-to-regexp**: `8.3.0` - 路径匹配
- **tldts**: `7.0.17` - 域名解析
- **uniqolor**: `1.1.1` - 唯一颜色生成

### 开发依赖
- `@follow/configs`: 共享配置
- `react-native`: `0.79.6` - React Native 支持
- `vite-tsconfig-paths`: TypeScript 路径映射

### 测试文件
- `src/lru-cache.test.ts` - LRU 缓存测试
- `src/path-parser.test.ts` - 路径解析测试
- `src/utils.spec.ts` - 通用工具测试

## 核心设计模式

### 1. 平台适配
提供统一的平台检测和适配机制：
- 操作系统检测
- 浏览器检测
- 移动设备识别

### 2. 性能优化
- `once()` 函数实现单次计算缓存
- LRU 缓存实现内存管理
- 防抖和节流优化

### 3. 类型安全
- 完整的 TypeScript 支持
- 泛型实现
- 严格的类型检查

### 4. 国际化支持
- 中英文混合排序
- 多语言数字格式化
- CJK 字符处理

## API 使用示例

### 样式处理
```typescript
import { cn } from "@follow/utils"

// 合并 Tailwind 类名
const className = cn("px-4 py-2", "bg-blue-500", isActive && "text-white")
```

### 平台检测
```typescript
import { getOS, isSafari } from "@follow/utils"

if (getOS() === "macOS") {
  // macOS 特定逻辑
}

if (isSafari()) {
  // Safari 浏览器特定处理
}
```

### LRU 缓存
```typescript
import { LRUCache } from "@follow/utils"

const cache = new LRUCache<string, any>(100)
cache.put("key1", { data: "value1" })
const value = cache.get("key1")
```

### DOM 操作
```typescript
import { nextFrame, stopPropagation } from "@follow/utils"

const cleanup = nextFrame(() => {
  console.log("下一帧执行")
})

// 组合事件处理器
const handleClick = composeEventHandlers(originalHandler, (e) => {
  stopPropagation(e)
  // 自定义逻辑
})
```

### URL 处理
```typescript
import { parseSafeUrl, getUrlIcon } from "@follow/utils"

const url = parseSafeUrl("https://example.com")
if (url) {
  console.log(url.hostname)
}

const { src, fallbackUrl } = getUrlIcon("https://github.com")
```

## 测试与质量

### 当前状态
- **测试覆盖**: ✅ 部分单元测试（3个测试文件）
- **类型安全**: ✅ TypeScript 严格模式
- **文档覆盖**: ✅ JSDoc 注释
- **测试框架**: Vitest

### 测试统计
- **LRU Cache**: 完整测试覆盖
- **Path Parser**: 路径解析测试
- **Utils**: 通用工具函数测试

### 建议改进
1. 补充更多工具函数的单元测试
2. 添加性能基准测试
3. 增加边界条件测试

## 文件清单

### 主要源文件
- `src/index.ts` - 主导出文件（14个模块）
- `src/utils.ts` - 核心工具函数（547行）
- `src/dom.ts` - DOM 操作工具（112行）
- `src/lru-cache.ts` - LRU 缓存实现（117行）

### 模块文件
- `src/bind-this.ts` - this 绑定
- `src/chain.ts` - 链式调用
- `src/cjk.ts` - 中日韩字符
- `src/color.ts` - 颜色处理
- `src/data-structure/` - 数据结构（2个文件）
- `src/duration.ts` - 时间段处理
- `src/environment.ts` - 环境处理
- `src/event-bus.*.ts` - 事件总线（Web/RN）
- `src/headers.ts` - HTTP 头
- `src/html.ts` - HTML 处理
- `src/img-proxy.ts` - 图片代理
- `src/jotai.ts` - Jotai 辅助
- `src/json-codec.ts` - JSON 编解码
- `src/language.ts` - 语言处理
- `src/link-parser.ts` - 链接解析
- `src/noop.ts` - 空操作
- `src/ns.ts` - 命名空间
- `src/path-parser.ts` - 路径解析
- `src/react.ts` - React 工具
- `src/resize.ts` - 尺寸处理
- `src/scroller.ts` - 滚动处理
- `src/url-builder.ts` - URL 构建
- `src/url-for-video.ts` - 视频 URL

### 配置文件
- `vitest.config.ts` - Vitest 测试配置

### 文件统计
- **总文件数**: 30+ 个 TypeScript 文件
- **测试文件**: 3 个
- **代码行数**: 约 2000+ 行
- **函数数量**: 100+ 个工具函数

## 变更记录 (Changelog)

- **2025-11-21** - 创建初始模块文档，分析所有工具函数模块

## 相关链接

- [@follow/hooks](../hooks/CLAUDE.md) - React Hooks 库
- [@follow/types](../types/CLAUDE.md) - 类型定义
- [@follow/components](../components/CLAUDE.md) - UI 组件库
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Vitest](https://vitest.dev/) - 测试框架