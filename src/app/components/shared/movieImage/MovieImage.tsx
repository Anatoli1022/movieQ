import { useState } from 'react';
import Image from 'next/image';
// import { addDefaultImage } from './addDefaultImage';
import Skeleton from './Skeleton';
import type { Movie } from '@/app/types';

export const MovieImage = ({ movie, width, height }: { movie: Movie; width: number; height: number }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className='relative'
      style={{
        width: isLoading ? width : '', // set width during loading
        height: isLoading ? height : '', // set height during loading
        aspectRatio: 'auto', // Ensures aspect ratio is maintained
      }}
    >
      {isLoading && <Skeleton className={`absolute min-h-full min-w-full h-[${height}px] w-[${width}px]`} />}

      <Image
        src={`${movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `https://placehold.co/${width}x${height}?text=No+Image`}`}
        alt={movie.title}
        width={width}
        height={height}
        className={`pointer-events-none ${isLoading ? 'opacity-0' : 'opacity-100'} rounded-lg`}
        onLoad={() => setIsLoading(false)}
        // onError={(e) => addDefaultImage(e, { width, height })} why is don't work
      />
    </div>
  );
};
