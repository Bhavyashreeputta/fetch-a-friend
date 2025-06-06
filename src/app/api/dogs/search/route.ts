import { NextRequest } from 'next/server';
import { pipe } from '@/utils/pipe';

const BASE = 'https://frontend-take-home-service.fetch.com/dogs/search';

export async function GET(req: NextRequest) {
  const upstream = await fetch(`${BASE}${req.nextUrl.search}`, {
    headers: {
      'Content-Type': 'application/json',
      cookie: req.headers.get('cookie') ?? '',
    },
  });

  return pipe(upstream);
}
