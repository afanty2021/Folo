# Readability 模块文档

[根目录](../../../CLAUDE.md) > [packages](../../) > **readability**

## 模块职责

`@follow-app/readability` 是 Folo 项目的网页内容提取包，基于 Mozilla Readability 算法，提供安全、可靠的网页正文提取功能，支持多种字符编码和 XSS 防护。

## 入口与启动

- **包版本**: `0.1.3`
- **包类型**: ESM 模块，支持发布
- **主入口**: `src/index.ts`
- **构建命令**: `pnpm run build` (使用 tsdown)
- **发布配置**: 支持 CJS/ESM 双格式发布

## 主要功能模块

### 1. 内容提取 (Content Extraction)
**核心函数**: `readability(baseUrl: string)`
- 基于 Mozilla Readability 算法
- 提取网页正文内容
- 保留文章结构和格式

### 2. 字符编码处理 (Character Encoding)
**函数**: `decodeResponseBodyChars(res: Response)`
- 自动检测字符编码
- 支持多种编码格式
- HTTP 头部编码优先

### 3. 安全清理 (Security Sanitization)
**函数**: `sanitizeHTMLString(dirtyDocumentString: string)`
- DOMPurify XSS 防护
- 恶意脚本过滤
- 安全的 HTML 处理

### 4. 链接处理 (Link Processing)
- 相对链接转绝对链接
- 图片、音频、视频资源处理
- URL 标准化

## 核心使用方式

### 基础内容提取
```typescript
import { readability } from "@follow-app/readability"

// 提取网页正文
const article = await readability("https://example.com/article")

console.log(article.title)    // 文章标题
console.log(article.content)  // 文章内容
console.log(article.excerpt)  // 文章摘要
```

### 提取结果结构
```typescript
interface ReadabilityResult {
  title: string          // 文章标题
  content: string        // 处理后的 HTML 内容
  textContent: string    // 纯文本内容
  length: number         // 内容长度
  excerpt: string        // 文章摘要
  byline: string         // 作者信息
  dir: string           // 文本方向
  siteName: string      // 站点名称
  publishedTime: string  // 发布时间
}
```

## 技术实现

### 1. 安全处理流程
```
URL 获取
    ↓
字符编码检测
    ↓
HTML 内容获取
    ↓
XSS 安全清理
    ↓
链接标准化
    ↓
Readability 解析
    ↓
结构化内容输出
```

### 2. 字符编码处理
```typescript
// 1. HTTP 头部编码检测
const httpCharset = contentType?.match(/charset=([\w-]+)/i)?.[1]

// 2. chardet 自动检测
const detectedCharset = httpCharset || chardet.detect(buffer) || "utf-8"

// 3. TextDecoder 安全解码
const decodedText = new TextDecoder(detectedCharset, { fatal: false }).decode(buffer)
```

### 3. XSS 防护机制
- 使用 linkedom 提供 DOM 环境
- DOMPurify 进行安全清理
- 移除潜在恶意脚本
- 保持 HTML 结构完整性

### 4. 链接处理策略
```typescript
// 相对链接转绝对链接
const replaceRelativeAddress = (baseUrl: string, url: string) => {
  if (url.startsWith("http")) {
    return url
  }
  return new URL(url, baseUrl).href
}
```

## 关键依赖与配置

### 核心依赖
- **@mozilla/readability**: `0.6.0` - Mozilla 内容提取算法
- **dompurify**: `3.3.0` - XSS 防护和 HTML 清理
- **linkedom**: `0.18.11` - 轻量级 DOM 实现
- **chardet**: `2.1.1` - 字符编码检测

### 开发依赖
- **@follow/configs**: 共享配置
- **tsdown**: `0.16.0` - TypeScript 构建工具
- **nbump**: `2.1.8` - 版本管理

### 构建配置
- **tsdown.config.ts** - TypeScript 构建配置
- **bump.config.ts** - 版本发布配置

## 安全特性

### 1. XSS 防护
- 完整的 HTML 清理流程
- 移除事件处理器和内联脚本
- 过滤危险属性和标签
- 安全的 DOM 操作

### 2. 编码安全
- 防止编码混淆攻击
- 安全的字符解码
- 编码异常处理

### 3. 网络安全
- 标准 User-Agent
- HTTP 头部安全设置
- 请求异常处理

## 性能优化

### 1. 内存管理
- 流式内容处理
- 及时释放资源
- 避免内存泄漏

### 2. 处理效率
- 并行编码检测
- 增量 DOM 解析
- 缓存优化策略

### 3. 网络优化
- 合理的请求超时
- 连接复用机制
- 错误重试策略

## 错误处理

### 1. 网络错误
```typescript
try {
  const article = await readability(url)
} catch (error) {
  if (error instanceof TypeError) {
    // 网络连接错误
  }
  // 处理其他错误
}
```

### 2. 解析错误
- HTML 格式错误处理
- 编码检测失败降级
- Readability 解析异常

### 3. 安全错误
- XSS 攻击检测
- 恶意内容过滤
- 异常脚本处理

## 配置选项

### 1. Readability 配置
```typescript
const reader = new Readability(document, {
  debug: isDev,        // 调试模式
  keepClasses: true,   // 保留 CSS 类名
})
```

### 2. 请求配置
```typescript
const response = await fetch(url, {
  headers: {
    "User-Agent": userAgents,
    Accept: "text/html",
  },
})
```

## 使用场景

### 1. RSS 阅读器
```typescript
// 从 RSS 链接提取正文
const articles = await Promise.all(
  rssItems.map(async (item) => {
    const content = await readability(item.link)
    return { ...item, content: content.content }
  })
)
```

### 2. 内容聚合
```typescript
// 批量提取网页内容
const extractContent = async (urls: string[]) => {
  const results = await Promise.allSettled(
    urls.map(url => readability(url))
  )

  return results
    .filter(result => result.status === 'fulfilled')
    .map(result => (result as PromiseFulfilledResult<any>).value)
}
```

### 3. 离线阅读
```typescript
// 提取并缓存内容
const cacheArticle = async (url: string) => {
  const article = await readability(url)
  await db.articles.create({
    data: { url, content: article.content, extractedAt: new Date() }
  })
}
```

## 最佳实践

### 1. 错误处理
- 始终使用 try-catch 包装调用
- 提供降级内容策略
- 记录解析失败的情况

### 2. 性能考虑
- 避免频繁的同步请求
- 实现内容缓存机制
- 使用并发处理批量任务

### 3. 安全考虑
- 验证 URL 有效性
- 限制请求频率
- 监控异常行为

## 文件清单

### 核心文件
- `src/index.ts` - 主实现文件（85行）
- `package.json` - 包配置
- `tsdown.config.ts` - 构建配置
- `bump.config.ts` - 版本配置

### 文件统计
- **总文件数**: 4 个主要文件
- **代码行数**: 约 100 行
- **主要函数**: 3 个核心函数
- **依赖数量**: 4 个核心依赖

## 变更记录 (Changelog)

- **2025-11-21** - 创建初始模块文档，分析可读性解析功能
- **版本**: 0.1.3 - 当前稳定版本

## 相关链接

- [@follow/utils](../internal/utils/CLAUDE.md) - 工具函数库
- [Mozilla Readability](https://github.com/mozilla/readability) - 内容提取算法
- [DOMPurify](https://github.com/cure53/DOMPurify) - XSS 防护库
- [linkedom](https://github.com/WebReflection/linkedom) - 轻量级 DOM 实现

## 路线图

### 短期计划
- [ ] 添加更多编码格式支持
- [ ] 优化大文件处理性能
- [ ] 增强错误处理机制

### 中期计划
- [ ] 支持图片内容提取
- [ ] 添加内容质量评分
- [ ] 实现增量内容更新

### 长期计划
- [ ] AI 内容摘要集成
- [ ] 多语言内容支持
- [ ] 自定义解析规则