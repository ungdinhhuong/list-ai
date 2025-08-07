import { NextResponse } from 'next/server';

import { PAGE_SIZE } from '@/constants/constants';
import { toolService } from '@/services/tool.service';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page') || 1);
  const pageSize = Number(searchParams.get('pageSize') || PAGE_SIZE);
  const q = searchParams.get('q') || '';

  const res = await toolService.getAllTools({ page, pageSize, q });

  return NextResponse.json(res);
}
