import { NextResponse } from 'next/server';

const BASE = 'https://frontend-take-home-service.fetch.com/dogs/breeds';

export async function GET() {
  const upstream = await fetch(BASE, {
    credentials: 'include',
  });

  const res = new NextResponse(upstream.body, { status: upstream.status });
  upstream.headers.forEach((v, k) => res.headers.set(k, v));
  return res;
}
