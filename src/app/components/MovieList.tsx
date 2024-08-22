import Link from 'next/link';
import { MovieImage } from '@/app/components/shared/movieImage/MovieImage';

interface MovieListProps {
  movies: Array<{ id: number; title: string; poster_path: string }>;
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <ul className='m-auto flex max-w-[1118px] flex-wrap gap-6'>
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
