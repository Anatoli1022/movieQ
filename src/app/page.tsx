import type { Metadata } from 'next';
import SwiperMovie from '@/app/components/shared/swiperMovie';
import { fetchMovieData } from '@/app/lib/movieApi';

export const metadata: Metadata = {
  title: 'Home',
};
interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface ApiResponse {
  results: Movie[];
}

export const runtime = 'edge';

export default async function Home() {
  let popularMovie: ApiResponse | null = null;
  let topRatedMovie: ApiResponse | null = null;
  let upcomingMovie: ApiResponse | null = null;
  try {
    popularMovie = await fetchMovieData('popular');
    topRatedMovie = await fetchMovieData('top_rated');
    upcomingMovie = await fetchMovieData('upcoming');
  } catch (error) {
    console.error('Error in Home component:', error);
    return (
      <div>
        <h1>An error has occurred</h1>
        <p>{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-10 overflow-hidden'>
      <div>
        <h2 className='text-2xl'>Popular movies</h2>
        <SwiperMovie movieData={popularMovie} />
      </div>
      <div>
        <h2 className='text-2xl'>Top rated movies</h2>
        <SwiperMovie movieData={topRatedMovie} />
      </div>
      <div>
        <h2 className='text-2xl'>Upcoming movies</h2>
        <SwiperMovie movieData={upcomingMovie} />
      </div>
    </div>
  );
}
