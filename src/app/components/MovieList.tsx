import Link from 'next/link';
import Image from 'next/image';
import Skeleton from './shared/Skeleton';

interface MovieListProps {
  movies: Array<{ id: number; title: string; poster_path: string }>;
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <ul className='m-auto flex max-w-[1118px] flex-wrap gap-6'>
      {movies.map((movie) => (
        <li key={movie.id} >
          <Link href={`/movie/${movie.id}`}>
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={200}
                height={300}
                className='rounded-lg'
              />
            ) : (
              <Skeleton className={'h-[300px] w-[200px]'} />
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
