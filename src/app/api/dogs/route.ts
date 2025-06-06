import { NextRequest} from 'next/server';
import { pipe } from '@/utils/pipe';

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

    return pipe(upstream);
}
