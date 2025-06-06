import { NextRequest, NextResponse } from 'next/server';

const UPSTREAM = 'https://frontend-take-home-service.fetch.com/dogs';

export async function POST(req: NextRequest) {
  const body = await req.text(); // array of dog IDs
  const upstream = await fetch(UPSTREAM, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: req.headers.get('cookie') ?? '',
    },
    body,
  });

  const res = new NextResponse(upstream.body, { status: upstream.status });
  upstream.headers.forEach((v, k) => res.headers.set(k, v));
  return res;
}
