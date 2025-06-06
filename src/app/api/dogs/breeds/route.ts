import { NextRequest} from 'next/server';
import { pipe } from '@/utils/pipe';

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

    return pipe(upstream);
}
