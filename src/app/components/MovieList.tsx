import Link from 'next/link';
import { MovieImage } from '@/app/components/shared/movieImage/MovieImage';
import type { Movie } from '@/app/types';
interface MovieListProps {
  movies: Array<Movie>;
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <ul className='m-auto flex flex-wrap gap-6'>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link href={`/movie/${movie.id}`}>
            <MovieImage movie={movie} width={200} height={300} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
