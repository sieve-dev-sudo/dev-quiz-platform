import { useState } from 'react'
import './CodeBlock.css'

const LANGUAGE_LABELS = {
  js: 'JavaScript',
  javascript: 'JavaScript',
  jsx: 'JSX',
  css: 'CSS',
  html: 'HTML',
  bash: 'Terminal',
}

function CodeBlock({ code, language = 'js', compact = false }) {
  const [copied, setCopied] = useState(false)
  const lines = code.replace(/\n$/, '').split('\n')

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className={compact ? 'code-block compact' : 'code-block'}>
      <div className="code-block-header">
        <span className="code-block-lang">{LANGUAGE_LABELS[language] ?? language}</span>
        {!compact && (
          <button type="button" className="code-block-copy" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      <pre className="code-block-pre">
        <code>
          {lines.map((line, index) => (
            <span key={index} className="code-line">
              <span className="code-line-number" aria-hidden="true">
                {index + 1}
              </span>
              <span className="code-line-content">{line || ' '}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}

export default CodeBlock
