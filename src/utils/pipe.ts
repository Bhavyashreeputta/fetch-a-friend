import { NextResponse } from 'next/server';

export function pipe(upstream: Response) {
  const res = new NextResponse(upstream.body, { status: upstream.status });

  upstream.headers.forEach((value, key) => {
    const k = key.toLowerCase();
    if (['content-encoding', 'content-length', 'transfer-encoding', 'connection'].includes(k))
      return; 
    res.headers.set(key, value);
  });

  return res;
}
