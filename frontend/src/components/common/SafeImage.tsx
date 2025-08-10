'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

type Props = Omit<ImageProps, 'src'> & {
  src?: string | null
  fallbackSrc?: string
}

export default function SafeImage({
                                    src,
                                    alt,
                                    fallbackSrc = '/images/img-fallback.png',
                                    ...rest
                                  }: Props) {
  const [err, setErr] = useState(false)
  const finalSrc = !src || err ? fallbackSrc : src

  return (
    <Image
      {...rest}
      alt={alt}
      src={finalSrc}
      onError={() => setErr(true)}
    />
  )
}
