import { useState, useCallback } from 'react'
import { useT } from '../i18n/index.ts'

interface CopyButtonProps {
  readonly text: string
  readonly label: string
  readonly className?: string
}

export function CopyButton({ text, label, className = '' }: CopyButtonProps) {
  const t = useT()
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [text])

  return (
    <button
      type="button"
      className={`copy-btn ${className}`}
      onClick={handleCopy}
    >
      {copied ? t.editor.copied : label}
    </button>
  )
}
