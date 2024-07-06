import Image from 'next/image';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface ApiResponse {
  results: Movie[];
}

export const runtime = 'edge';

async function getData() {
  const apiKey = process.env.NEXT_API_MOVIE_KEY;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);

  if (!res.ok) {
    console.error('Failed to fetch data:', res.status, res.statusText);

    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  let data: ApiResponse | null = null;

  try {
    data = await getData();
  } catch (error) {
    console.error('Error in Home component:', error);
    return (
      <main>
        <h1>Произошла ошибка</h1>
        <p>{(error as Error).message}</p>
      </main>
    );
  }

  return (
    <main className='ml-auto mr-auto max-w-7xl overflow-hidden'>
      <h2 className='text-2xl'> Популярные фильмы</h2>
      <ul className='mt-5 flex gap-3 hover:overflow-x-scroll'>
        {data &&
          data.results.map((movie) => {
            return (
              <li key={movie.id} className='min-w-28'>
                <Link href={`/movie/${movie.id}`}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={200}
                    height={300}
                  />
                </Link>
              </li>
            );
          })}
      </ul>
    </main>
  );
}
