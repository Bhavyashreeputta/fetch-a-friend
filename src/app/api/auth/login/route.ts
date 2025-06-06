import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();

  const fetchRes = await fetch(
    'https://frontend-take-home-service.fetch.com/auth/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', 
      body: JSON.stringify({ name, email }),
    },
  );

  const res = new NextResponse(fetchRes.body, { status: fetchRes.status });
  fetchRes.headers.forEach((v, k) => res.headers.set(k, v));
  return res;
}
