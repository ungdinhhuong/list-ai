"use client";

export function StructuredData({ jsonLd }: { jsonLd: string | object | undefined | null }) {
  if (!jsonLd) {
    return null
  }
  const structuredData = typeof jsonLd === 'string'
    ? jsonLd
    : JSON.stringify(jsonLd)
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: structuredData }}
    />
  )
}
