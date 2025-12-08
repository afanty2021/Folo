import DOMPurify from "dompurify"
import type { FC } from "react"
import { memo, useMemo } from "react"
import * as React from "react"

export const MemoedDangerousHTMLStyle: FC<
  {
    children: string
  } & React.DetailedHTMLProps<React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement> &
    Record<string, unknown>
> = memo(({ children, ...rest }) => (
  <style
    {...rest}
    dangerouslySetInnerHTML={useMemo(
      () => ({
        // 对于样式标签，只允许 CSS 相关内容
        __html: DOMPurify.sanitize(children, {
          ALLOWED_TAGS: [], // 样式标签不应包含 HTML 标签
          ALLOWED_ATTR: [],
          ALLOW_DATA_URI: false,
        }),
      }),
      [children],
    )}
  />
))
