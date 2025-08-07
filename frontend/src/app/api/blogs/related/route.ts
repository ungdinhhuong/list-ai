import { NextRequest, NextResponse } from 'next/server';

import { blogService } from '@/services/blog.service';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get('categoryId');
  const excludeId = searchParams.get('excludeId');
  const limit = searchParams.get('limit') || 3;

  if (!categoryId) {
    return NextResponse.json({ error: 'categoryId is required' }, { status: 400 });
  }

  const res = await blogService.getBlogsRelated({
    categoryId: Number(categoryId),
    excludeId: Number(excludeId),
    limit: Number(limit),
  });

  return NextResponse.json(res);
}
