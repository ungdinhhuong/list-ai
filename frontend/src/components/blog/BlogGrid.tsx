import Image from 'next/image'
import { renderUrlImage } from '@/utils/functions'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { CalendarDays, User } from 'lucide-react'
import { fromNow } from '@/utils/date'
import React from 'react'
import { BlogType } from '@/types/blog.type'
import { ROUTES } from '@/constants/routes'

interface BlogGridProps {
  post: BlogType
}

export default function BlogGrid({ post }: BlogGridProps) {
  return (
    <Card
      key={post.id}
      className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden py-0 gap-4 shadow-none flex flex-col justify-between"
    >
      {/* Image */}
      <div className="relative overflow-hidden border-b">
        <Link href={`${ROUTES.BLOG}/${post.slug}`}>
          <Image
            src={renderUrlImage(post.thumbnail?.url || '')}
            alt={post.title}
            width="370"
            height="250"
            className="w-full h-48 lg:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        {post.category && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary">{post.category?.name}</Badge>
          </div>
        )}
      </div>

      {/* Title */}
      <CardHeader className="gap-0">
        <CardTitle className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
          <Link href={`${ROUTES.BLOG}/${post.slug}`}>{post.title}</Link>
        </CardTitle>
      </CardHeader>

      {/* Description */}
      <CardContent className="flex-1">
        <CardDescription className="line-clamp-3 text-md">
          {post.description}
        </CardDescription>
      </CardContent>

      {/* Footer: Admin + Date */}
      <CardFooter className="pt-0 pb-4">
        <div className="flex items-center justify-between w-full text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <User className="w-4 h-4" />
            <span>Admin</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <CalendarDays className="w-4 h-4" />
            <span>{fromNow(post.updatedAt)}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
