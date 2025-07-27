export function StructuredData({ jsonLd }: { jsonLd: string }) {
  if (!jsonLd) return null
  return (
    <head>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
    </head>
  )
}
