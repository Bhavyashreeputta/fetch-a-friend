import { NextRequest, NextResponse } from 'next/server';

const UPSTREAM = 'https://frontend-take-home-service.fetch.com/auth/logout';

export async function POST(req: NextRequest) {
  const upstream = await fetch(UPSTREAM, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: req.headers.get('cookie') ?? '',
    },
  });
  
  const res = new NextResponse(upstream.body, { status: upstream.status });
  upstream.headers.forEach((v, k) => res.headers.set(k, v));
  return res;
}
