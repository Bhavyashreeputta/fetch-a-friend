import { NextRequest, NextResponse } from 'next/server';

const BASE = 'https://frontend-take-home-service.fetch.com/dogs/search';

export async function GET(req: NextRequest) {
  const upstream = await fetch(`${BASE}${req.nextUrl.search}`, {
    headers: {
      'Content-Type': 'application/json',
      cookie: req.headers.get('cookie') ?? '',
    },
  });

  const res = new NextResponse(upstream.body, { status: upstream.status });
  upstream.headers.forEach((v, k) => res.headers.set(k, v));
  return res;
}
