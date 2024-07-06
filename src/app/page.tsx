import SwiperMovie from './components/swiperMovie';

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

      <SwiperMovie movieData={data} />
    </main>
  );
}
