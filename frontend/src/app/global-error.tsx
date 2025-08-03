'use client'

import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Ghi log ra server nếu muốn
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
    <body>
    <div style={{ padding: 40 }}>
      <h1>🛑 Global Error Caught</h1>
      <p><strong>Message:</strong> {error.message}</p>
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 20 }}>
            {error.stack}
          </pre>
      <button onClick={reset} style={{ marginTop: 20 }}>Thử lại</button>
    </div>
    </body>
    </html>
  )
}
