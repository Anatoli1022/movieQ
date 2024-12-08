'use client';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Movie } from '../types';
import { MovieImage } from './shared/movieImage/MovieImage';

interface RandomFilmProps {
  movie: Movie;
  likeMovie: (movie: Movie) => void;
  skipMovie: () => void;
}

const RandomFilm = ({ movie, likeMovie, skipMovie }: RandomFilmProps) => {
  const x = useMotionValue(0);
  const borderColor = useTransform(
    x,
    [-150, 0, 150], // Диапазон значений x
    ['#E60000', '#ffffff', ' #008000'], // Соответствующие цвета
  );
  const handleDragEnd = (_: any, info: any) => {
    const { offset } = info;

    if (offset.x > 150) {
      // Перетаскивание вправо

      likeMovie(movie);
    } else if (offset.x < -150) {
      // Перетаскивание влево

      skipMovie();
    }
  };
  return (
    <div className='mt-5'>
      {movie && (
        <>
          <div className='max-w-2xl'>
            <h3 className='text-xl'>{movie.title}</h3>
            <p className='mt-2'>{movie.overview}</p>
          </div>
          <div className='flex w-full items-center justify-center'>
            <motion.div
              className='mt-4 w-full max-w-[200px] rounded-xl'
              drag='x' // Ограничиваем перетаскивание по оси X
              dragConstraints={{ left: 0, right: 0 }} // Не даем картинке улетать за пределы экрана
              onDragEnd={handleDragEnd} // Событие, вызываемое при окончании перетаскивания
              style={{ x, borderColor, border: '4px solid', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}
            >
              {/* <Link href={`/movie/${movie.id}`} className='pointer-events-none'> */}
              <MovieImage movie={movie} width={200} height={300} />
              {/* </Link> */}
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

export default RandomFilm;
