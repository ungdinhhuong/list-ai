import {toolService} from "@/services/tool.service";
import {NextResponse} from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page') || '1');
  const pageSize = Number(searchParams.get('pageSize') || '10');

  const res = await toolService.getAllTools({ page, pageSize });

  return NextResponse.json(res);
}