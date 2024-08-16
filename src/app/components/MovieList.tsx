import Link from 'next/link';
import Image from 'next/image';

interface MovieListProps {
  movies: Array<{ id: number; title: string; poster_path: string }>;
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <ul className='flex flex-wrap gap-6  max-w-[1118px] m-auto'>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link href={`/movie/${movie.id}`}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={200}
              height={300}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
