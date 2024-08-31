'use client';
import { useState } from 'react';
import { fetchMovieData } from '../lib/movieApi';
import type { Movie } from '@/app/types';
import { MovieImage } from './shared/movieImage/MovieImage';
import Link from 'next/link';

const RandomFilm = () => {
  const arrApi = ['popular', 'top_rated'];
  const [movie, setMovie] = useState<Movie | null>(null);

  const getRandomNum = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  480;
  const getRandom = async () => {
    const category = arrApi[getRandomNum(arrApi.length)];
    const randomPage = getRandomNum(480);
    try {
      const result = await fetchMovieData(category, '', randomPage);
      if (result && result.results.length > 0) {
        const randomMovie = result.results[getRandomNum(result.results.length)];
        setMovie(randomMovie);
      }
    } catch (error) {
      console.error('Error in Home component:', error);
    }
    console.log(movie);
  };

  return (
    <div>
      
      <button onClick={getRandom}>Random</button>
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
