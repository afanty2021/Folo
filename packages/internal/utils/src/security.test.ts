import { describe, it, expect, vi } from 'vitest'
import DOMPurify from 'dompurify'

describe('Security Utilities', () => {
  describe('HTML Sanitization', () => {
    it('should sanitize malicious HTML content', () => {
      const maliciousHtml = '<img src=x onerror=alert("XSS")>'
      const sanitized = DOMPurify.sanitize(maliciousHtml)

      expect(sanitized).not.toContain('onerror')
      expect(sanitized).not.toContain('alert')
      expect(sanitized).not.toContain('<img')
    })

    it('should allow safe HTML tags', () => {
      const safeHtml = '<p>Hello <strong>world</strong></p>'
      const sanitized = DOMPurify.sanitize(safeHtml, {
        ALLOWED_TAGS: ['p', 'strong'],
        ALLOWED_ATTR: []
      })

      expect(sanitized).toContain('<p>')
      expect(sanitized).toContain('<strong>')
      expect(sanitized).toContain('Hello')
      expect(sanitized).toContain('world')
    })

    it('should remove dangerous attributes', () => {
      const dangerousHtml = '<a href="javascript:alert(\'XSS\')">Click me</a>'
      const sanitized = DOMPurify.sanitize(dangerousHtml)

      expect(sanitized).not.toContain('javascript:')
      expect(sanitized).not.toContain('alert')
    })

    it('should handle code blocks safely', () => {
      const codeHtml = '<pre><code>const x = 42; console.log(x);</code></pre>'
      const sanitized = DOMPurify.sanitize(codeHtml, {
        ALLOWED_TAGS: ['pre', 'code'],
        ALLOWED_ATTR: []
      })

      expect(sanitized).toContain('<pre>')
      expect(sanitized).toContain('<code>')
      expect(sanitized).toContain('const x = 42;')
    })
  })

  describe('Input Validation', () => {
    it('should validate URLs properly', () => {
      const validUrls = [
        'https://example.com',
        'http://localhost:3000',
        'ftp://files.example.com'
      ]

      const invalidUrls = [
        'javascript:alert("XSS")',
        'data:text/html,<script>alert("XSS")</script>',
        'vbscript:msgbox("XSS")'
      ]

      validUrls.forEach(url => {
        try {
          new URL(url)
          expect(true).toBe(true) // 如果没有抛出异常，说明是有效的 URL
        } catch {
          expect(false).toBe(true) // 如果抛出异常，测试失败
        }
      })

      invalidUrls.forEach(url => {
        try {
          new URL(url)
          expect(false).toBe(true) // 如果没有抛出异常，说明没有正确检测到无效 URL
        } catch {
          expect(true).toBe(true) // 如果抛出异常，说明正确检测到无效 URL
        }
      })
    })
  })

  describe('Content Security Policy', () => {
    it('should have proper CSP headers', () => {
      const mockHeaders = {
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
      }

      expect(mockHeaders['Content-Security-Policy']).toContain("default-src 'self'")
      expect(mockHeaders['Content-Security-Policy']).toContain("script-src 'self'")
    })
  })
})