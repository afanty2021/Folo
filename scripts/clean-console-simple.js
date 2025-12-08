#!/usr/bin/env node

/**
 * 简化版生产环境 console.log 清理脚本
 */

const fs = require('fs')
const path = require('path')
const glob = require('glob')

// 需要移除的 console 方法
const CONSOLE_TO_REMOVE = ['log', 'debug', 'info', 'trace', 'table', 'group', 'groupCollapsed', 'groupEnd', 'clear', 'count', 'dir', 'dirxml', 'profile', 'profileEnd', 'memory']

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    let modifiedContent = content
    let hasChanges = false

    for (const method of CONSOLE_TO_REMOVE) {
      const regex = new RegExp(`\\bconsole\\.${method}\\s*\\(`, 'g')
      const matches = content.match(regex)
      if (matches) {
        modifiedContent = modifiedContent.replace(regex, `// console.${method} 已在生产环境移除`)
        hasChanges = true
        console.log(`🔧 ${filePath}: 移除 ${matches.length} 处 console.${method}`)
      }
    }

    // 移除 debugger 语句
    const debuggerRegex = /\bdebugger\b/g
    const debuggerMatches = content.match(debuggerRegex)
    if (debuggerMatches) {
      modifiedContent = modifiedContent.replace(debuggerRegex, '// debugger 语句已在生产环境移除')
      hasChanges = true
      console.log(`🔧 ${filePath}: 移除 ${debuggerMatches.length} 处 debugger`)
    }

    if (hasChanges) {
      // 清理多余空行
      modifiedContent = modifiedContent
        .split('\n')
        .filter(line => line.trim() !== '' || line.trim().startsWith('//'))
        .join('\n')
        .replace(/\n{3,}/g, '\n\n')

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
  const ext = path.extname(filePath)
  const allowedExtensions = ['.ts', '.tsx', '.js', '.jsx']

  if (!allowedExtensions.includes(ext)) {
    return false
  }

  // 排除测试文件
  if (filePath.includes('.test.') || filePath.includes('.spec.') || filePath.includes('__tests__')) {
    return false
  }

  // 排除特定目录
  const excludeDirs = ['node_modules', 'dist', 'build', '.git', 'coverage', '.next', '.nuxt', '.output', '.turbo', '.vercel']

  return !excludeDirs.some(dir => filePath.includes(`/${dir}/`))
}

function main() {
  console.log('🚀 开始清理生产环境 console.log...\n')

  const files = glob.sync('**/*.{ts,tsx,js,jsx}', {
    cwd: process.cwd(),
    ignore: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.git/**',
      '**/coverage/**',
      '**/.next/**',
      '**/.nuxt/**',
      '**/.output/**',
      '**/.turbo/**',
      '**/.vercel/**',
      '**/*.d.ts',
      '**/*.test.*',
      '**/*.spec.*',
      '**/__tests__/**',
      '**/packages/node_modules/**',
      '**/packages/dist/**'
    ]
  })

  const filesToProcess = files.filter(shouldProcessFile)
  console.log(`📁 找到 ${filesToProcess.length} 个文件需要处理\n`)

  let processedCount = 0
  let modifiedCount = 0

  for (const filePath of filesToProcess) {
    processedCount++
    if (processFile(filePath)) {
      modifiedCount++
    }
  }

  console.log(`\n📊 处理完成统计:`)
  console.log(`   - 总文件数: ${processedCount}`)
  console.log(`   - 修改文件数: ${modifiedCount}`)
  console.log(`   - 清理率: ${((modifiedCount / processedCount) * 100).toFixed(1)}%`)

  if (modifiedCount > 0) {
    console.log('\n✨ 生产环境 console.log 清理完成！')
    console.log('💡 提示: 建议在 CI/CD 中运行此脚本以确保生产环境清洁')
  } else {
    console.log('\n🎉 没有找到需要清理的 console.log')
  }
}

if (require.main === module) {
  main()
}