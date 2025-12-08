#!/usr/bin/env node

/**
 * 生产环境 console.log 清理脚本
 * 移除生产环境不需要的调试日志，保留错误和警告日志
 */

const fs = require('fs')
const path = require('path')
const glob = require('glob')

// 需要保留的 console 方法（错误和警告相关的）
const ALLOWED_CONSOLE_METHODS = new Set([
  'error',    // 错误日志 - 保留
  'warn',     // 警告日志 - 保留
  'assert',   // 断言检查 - 保留
  'time',     // 性能计时 - 保留
  'timeEnd',  // 计时结束 - 保留
])

// 需要移除的 console 方法（调试相关的）
const CONSOLE_METHODS_TO_REMOVE = [
  'log',      // 普通日志 - 移除
  'debug',    // 调试日志 - 移除
  'info',     // 信息日志 - 移除
  'trace',    // 跟踪日志 - 移除
  'table',    // 表格输出 - 移除
  'group',    // 分组输出 - 移除
  'groupCollapsed', // 折叠分组 - 移除
  'groupEnd', // 分组结束 - 移除
  'clear',    // 清空控制台 - 移除
  'count',    // 计数 - 移除
  'dir',      // 对象详情 - 移除
  'dirxml',   // XML 输出 - 移除
  'profile',  // 性能分析 - 移除
  'profileEnd', // 分析结束 - 移除
  'memory',   // 内存信息 - 移除
]

const patterns = [
  // 匹配 console.log 等方法调用
  ...CONSOLE_METHODS_TO_REMOVE.map(method => ({
    pattern: new RegExp(`\\bconsole\\.${method}\\s*\\(`, 'g'),
    replacement: `// console.${method} 已在生产环境移除`,
    description: `移除 console.${method}`
  })),

  // 匹配 window.console 调用
  ...CONSOLE_METHODS_TO_REMOVE.map(method => ({
    pattern: new RegExp(`\\bwindow\\.console\\.${method}\\s*\\(`, 'g'),
    replacement: `// window.console.${method} 已在生产环境移除`,
    description: `移除 window.console.${method}`
  })),

  // 匹配 console.debugger 语句
  {
    pattern: /\\bdebugger\\b/g,
    replacement: '// debugger 语句已在生产环境移除',
    description: '移除 debugger 语句'
  }
]

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    let modifiedContent = content
    let hasChanges = false

    for (const { pattern, replacement, description } of patterns) {
      const matches = content.match(pattern)
      if (matches) {
        modifiedContent = modifiedContent.replace(pattern, replacement)
        hasChanges = true
        console.log(`🔧 ${filePath}: ${description} (${matches.length} 处)`)
      }
    }

    // 移除空行
    if (hasChanges) {
      modifiedContent = modifiedContent
        .split('\\n')
        .filter(line => {
          const trimmed = line.trim()
          // 保留包含实际代码的行或重要的注释
          return trimmed !== '' ||
                 trimmed.startsWith('// ') ||
                 trimmed.startsWith('/*') ||
                 trimmed.startsWith('*') ||
                 trimmed.startsWith('*/')
        })
        .join('\\n')
        .replace(/\\n{3,}/g, '\\n\\n') // 避免超过2个连续空行

      fs.writeFileSync(filePath, modifiedContent, 'utf8')
      console.log(`✅ 已清理: ${filePath}`)
    }

    return hasChanges
  } catch (error) {
    console.error(`❌ 处理文件失败 ${filePath}:`, error.message)
    return false
  }
}

function shouldProcessFile(filePath) {
  // 只处理源代码文件
  const extensions = ['.ts', '.tsx', '.js', '.jsx']
  const ext = path.extname(filePath)

  if (!extensions.includes(ext)) {
    return false
  }

  // 排除的目录和文件
  const excludePatterns = [
    /node_modules/,
    /dist/,
    /build/,
    /.git/,
    /coverage/,
    /\\.vscode/,
    /\\.idea/,
    /\\.next/,
    /\\.nuxt/,
    /\\.output/,
    /\\.turbo/,
    /\\.vercel/,
    // 测试文件保留 console.log
    /\\.test\\./,
    /\\.spec\\./,
    /__tests__/,
    // 配置文件
    /\\.d\\.ts$/,
    /config\\./,
    /scripts\\./,
    // 第三方库文件
    /packages\\/node_modules/,
    /packages\\/dist/
  ]

  return !excludePatterns.some(pattern => pattern.test(filePath))
}

function main() {
  console.log('🚀 开始清理生产环境 console.log...\\n')

  // 查找所有需要处理的文件
  const files = glob.sync('**/*.{ts,tsx,js,jsx}', {
    cwd: process.cwd(),
    ignore: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.git/**',
      '**/coverage/**',
      '**/*.d.ts',
      '**/*.test.*',
      '**/*.spec.*',
      '**/__tests__/**',
      '**/packages/node_modules/**',
      '**/packages/dist/**'
    ]
  })

  const filesToProcess = files.filter(shouldProcessFile)

  console.log(`📁 找到 ${filesToProcess.length} 个文件需要处理\\n`)

  let processedCount = 0
  let modifiedCount = 0

  for (const filePath of filesToProcess) {
    processedCount++
    if (processFile(filePath)) {
      modifiedCount++
    }
  }

  console.log(`\\n📊 处理完成统计:`)
  console.log(`   - 总文件数: ${processedCount}`)
  console.log(`   - 修改文件数: ${modifiedCount}`)
  console.log(`   - 清理率: ${((modifiedCount / processedCount) * 100).toFixed(1)}%`)

  if (modifiedCount > 0) {
    console.log('\\n✨ 生产环境 console.log 清理完成！')
    console.log('💡 提示: 建议在 CI/CD 中运行此脚本以确保生产环境清洁')
  } else {
    console.log('\\n🎉 没有找到需要清理的 console.log')
  }
}

// 检查是否直接运行此脚本
if (require.main === module) {
  main()
}

module.exports = {
  processFile,
  shouldProcessFile,
  patterns,
  CONSOLE_METHODS_TO_REMOVE,
  ALLOWED_CONSOLE_METHODS
}