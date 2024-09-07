'use client';
import { useState } from 'react';
import { getRandomMovie } from '../utils/randomMovie';
import type { Movie } from '@/app/types';
import { MovieImage } from './shared/movieImage/MovieImage';
import Link from 'next/link';

const RandomFilm = () => {
  const [movie, setMovie] = useState<Movie | null>(null);

  const randomMovie = async () => {
    setMovie(await getRandomMovie());
  };

  return (
    <div>
      <button onClick={randomMovie}>Random</button>
      {movie && (
        <Link href={`/movie/${movie.id}`}>
          <h3>{movie.title}</h3>
          <p>{movie.overview}</p>
          <MovieImage movie={movie} width={200} height={300} />
        </Link>
      )}
    </div>
  );
};

export default RandomFilm;
