# Database 数据模块

[根目录](../../../CLAUDE.md) > [packages](../../) > [internal](../) > **database**

## 模块职责

提供统一的数据访问层，基于 Drizzle ORM 和 SQLite。支持多平台数据持久化，包括 Web (IndexedDB)、移动端 (SQLite)、桌面端 (SQLite)，提供类型安全的数据库操作和迁移管理。

## 入口与启动

### 主入口
- **文件**: `src/index.ts`
- **功能**: 导出数据库相关 API 和工具

### 数据库配置
- **文件**: `drizzle.config.ts`
- **功能**: Drift 配置，指定 schema 和输出目录

### Schema 入口
- **文件**: `src/schemas/index.ts`
- **功能**: 所有数据库表的统一导出

## 对外接口

### 核心 API
```typescript
// 数据库连接
export * from './src/db'

// Schema 定义
export * from './src/schemas'

// 数据库服务
export * from './src/services'
```

### 支持的数据库
- **SQLite**: 移动端和桌面端主要数据库
- **IndexedDB**: Web 端数据存储
- **SQLocal**: 轻量级 SQLite WASM 版本

## 关键依赖与配置

### 核心依赖
```json
{
  "drizzle-orm": "0.44.7",
  "expo-sqlite": "15.2.12",
  "sqlocal": "npm:@hyoban/sqlocal@0.14.1-fork.4",
  "wa-sqlite": "git+https://github.com/rhashimoto/wa-sqlite.git#v1.0.8"
}
```

### SDK 集成
```json
{
  "@follow-app/client-sdk": "catalog:"
}
```

### 内部依赖
```json
{
  "@follow/constants": "workspace:*",
  "@follow/models": "workspace:*",
  "@follow/shared": "workspace:*"
}
```

## 数据模型

### 核心表结构
- **用户表**: 用户信息和偏好设置
- **订阅表**: RSS/Atom 订阅源管理
- **文章表**: 文章内容和元数据
- **阅读记录**: 用户阅读历史
- **设置表**: 应用配置和用户设置

### Schema 特性
- **类型安全**: 完全的 TypeScript 类型推导
- **关系映射**: 表间关系和约束
- **索引优化**: 查询性能优化
- **迁移管理**: 数据库结构版本控制

## 测试与质量

### 质量检查
- **类型检查**: `pnpm run typecheck`
- **Schema 验证**: Drift 模式验证
- **迁移测试**: 数据库迁移兼容性

### 开发工具
- **Drizzle Studio**: 可视化数据库管理
- **生成命令**: `pnpm run generate`

## 常见问题 (FAQ)

### Q: 如何在不同平台使用不同的数据库？
A: 使用环境变量检测平台，自动选择合适的数据库驱动。

### Q: 如何处理数据库迁移？
A: 使用 Drizzle Kit 生成迁移文件，支持版本控制和回滚。

### Q: 如何优化查询性能？
A:
1. 添加适当的索引
2. 使用查询缓存
3. 分页查询大数据集
4. 避免 N+1 查询问题

### Q: 如何处理数据同步？
A: 实现增量同步机制，使用时间戳或版本号跟踪变更。

## 相关文件清单

### 核心文件
- `src/index.ts` - 主入口
- `drizzle.config.ts` - Drizzle 配置
- `package.json` - 依赖和脚本

### Schema 定义
- `src/schemas/` - 数据库表定义
- `src/migrations/` - 数据库迁移文件
- `src/services/` - 数据库服务层

### 数据库连接
- `src/db/` - 数据库连接配置
- `src/drivers/` - 平台特定驱动

## 开发指南

### 本地开发
```bash
# 进入目录
cd packages/internal/database

# 类型检查
pnpm run typecheck

# 生成 Schema
pnpm run generate

# 启动 Drizzle Studio
npx drizzle-kit studio
```

### Schema 修改
1. 修改 `src/schemas/` 中的表定义
2. 运行 `pnpm run generate` 生成迁移
3. 测试迁移文件的兼容性
4. 应用迁移到数据库

### 查询优化
- 使用 Drizzle 的查询构建器
- 避免 SQL 注入风险
- 合理使用索引和关联查询
- 监控查询执行计划

## 最佳实践

### 命名规范
- 表名使用复数形式（`users`, `feeds`）
- 字段名使用 snake_case
- 索引名使用 `idx_` 前缀

### 数据类型
- 使用合适的数据类型
- 日期时间使用 ISO 字符串
- JSON 数据存储为 TEXT 类型

### 关系设计
- 明确定义外键约束
- 使用级联删除策略
- 考虑数据完整性

## 性能优化

### 索引策略
- 为查询字段添加索引
- 复合索引优化多字段查询
- 定期分析索引使用情况

### 查询优化
- 使用 LIMIT 分页
- 避免 SELECT *
- 合理使用 JOIN
- 批量操作优化

### 缓存策略
- 查询结果缓存
- 应用层缓存
- 数据库连接池

## 变更记录 (Changelog)

- **2025-11-21 08:18:00** - 初始化模块文档，定义数据库架构和 API