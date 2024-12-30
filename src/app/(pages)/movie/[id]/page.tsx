
import type { Metadata } from 'next';
import { fetchMovieData } from '@/app/lib/movieApi';

import { MovieImage } from '@/app/components/shared/movieImage/MovieImage';
import Image from 'next/image';
import noTrailerImage from '@/app/assets/noTrailer.svg';
import type { Movie, Params,  Video } from '@/app/types';

import Similar from '@/app/components/pages/movie/Similar';
import Trailer from '@/app/components/pages/movie/Trailer';

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
  let movie: Movie | null = null;

  try {
    movie = await fetchMovieData(id);
  } catch (error) {
    console.error('Error in Home component:', error);
    return (
      <div>
        <h1>Произошла ошибка</h1>
        <p>{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className='pb-4'>
      {movie && (
        <>
          <h1 className='text-2xl'>{movie.title}</h1>
          <div className='mt-3 flex gap-x-5'>
            <MovieImage movie={movie} width={300} height={450} />

            <div className='max-w-4xl'>
              <div>
                <span className='font-semibold'> Average rating:</span>
                <span className='ml-2'>{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className='mt-2'>
                <span className='font-semibold'>Number of votes:</span>
                <span className='ml-2'>{movie.vote_count}</span>
              </div>
              <div className='mt-2'>
                <span className='font-semibold'>Release date:</span>
                <span className='ml-2'>{movie.release_date}</span>
              </div>
              <div className='mt-2 flex'>
                <span className='font-semibold'>Genres:</span>
                <ul className='ml-2 flex gap-x-2'>
                  {movie.genres.map((item, i) => (
                    <li key={item.id}>
                      {item.name}
                      {movie.genres.length - 1 === i ? '.' : ','}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='mt-2 flex'>
                <span className='text-nowrap font-semibold'>Production companies:</span>
                <ul className='ml-2 flex flex-wrap items-center gap-x-2 gap-y-1'>
                  {movie.production_companies.map((item, i) => (
                    <li key={item.id}>
                      <span>
                        {item.name}
                        {movie.production_companies.length - 1 === i ? '.' : ','}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='mt-2 flex'>
                <span className='font-semibold'>Production countries:</span>
                <ul className='ml-2 flex gap-x-2'>
                  {movie.production_countries.map((item, i) => (
                    <li key={i}>
                      <span>
                        {item.name}
                        {movie.production_countries.length - 1 === i ? '.' : ','}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className='mt-4'>{movie.overview}</p>
            </div>
          </div>
        </>
      )}
      <Trailer id={id} />

      <Similar id={id} />
    </div>
  );
}
