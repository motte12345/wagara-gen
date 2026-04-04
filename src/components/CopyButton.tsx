import { useState, useCallback, useRef, useEffect } from 'react'
import { useT } from '../i18n/index.ts'

interface CopyButtonProps {
  readonly text: string
  readonly label: string
  readonly className?: string
}

export function CopyButton({ text, label, className = '' }: CopyButtonProps) {
  const t = useT()
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleCopy = useCallback(async () => {
    let success = false
    try {
      await navigator.clipboard.writeText(text)
      success = true
    } catch {
      try {
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        success = true
      } catch {
        // Both methods failed
      }
    }
    if (success) {
      if (timerRef.current) clearTimeout(timerRef.current)
      setCopied(true)
      timerRef.current = setTimeout(() => setCopied(false), 2000)
    }
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
