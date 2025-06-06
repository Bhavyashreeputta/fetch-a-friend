import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const upstream = await fetch(
    'https://frontend-take-home-service.fetch.com/dogs/breeds',
    {
      headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.get('cookie') ?? '',   
      },
    },
  );

  const res = new NextResponse(upstream.body, { status: upstream.status });
  upstream.headers.forEach((v, k) => res.headers.set(k, v));
  return res;
}
