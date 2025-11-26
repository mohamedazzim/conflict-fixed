import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  return NextResponse.json({ slug: params.slug });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({ slug: params.slug, body });
}
