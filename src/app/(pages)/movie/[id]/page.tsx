import type { Metadata } from 'next';
import { fetchMovieData } from '@/app/lib/movieApi';

import type { Movie, Params } from '@/app/types';

import Similar from '@/app/components/pages/movie/Similar';
import Trailer from '@/app/components/pages/movie/Trailer';
import MovieInfo from '@/app/components/pages/movie/MovieInfo';

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = params;
  let movie: Movie | null = null;

  try {
    movie = await fetchMovieData(id);
  } catch (error) {
    console.error('Error fetching movie data:', error);
  }
  const title = movie ? movie.title : 'Movie Details';
  const description = movie ? movie.overview : 'Movie details page';
  return {
    title,
    description,
  };
}

export default async function MoviePage({ params }: { params: Params }) {
  const { id } = params;

  return (
    <div >
      <div className='aspect-video w-full'>
        <MovieInfo id={id} />
        <Trailer id={id} />
      </div>

      <Similar id={id} />
    </div>
  );
}
