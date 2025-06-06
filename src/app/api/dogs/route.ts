import { NextRequest, NextResponse } from 'next/server';

const BASE = 'https://frontend-take-home-service.fetch.com/dogs';

export async function POST(req: NextRequest) {
  const body = await req.text(); 
  const upstream = await fetch(BASE, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  const res = new NextResponse(upstream.body, { status: upstream.status });
  upstream.headers.forEach((v, k) => res.headers.set(k, v));
  return res;
}
