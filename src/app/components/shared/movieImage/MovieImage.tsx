'use client';
import { useState } from 'react';
import Image from 'next/image';
import { addDefaultImage } from './addDefaultImage';
import Skeleton from '../Skeleton';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}
export const MovieImage = ({ movie, width, height }: { movie: Movie; width: number; height: number }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      style={{
        position: 'relative',
        width: isLoading ? width : '',
        height: isLoading ? height : '',
      }}
    >
      {isLoading && <Skeleton className={`absolute min-h-full min-w-full h-[${height}px] w-[${width}px]`} />}

      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={width}
        height={height}
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} rounded-lg`}
        onLoad={() => setIsLoading(false)}
        onError={(e) => addDefaultImage(e, { width, height })}
      />
    </div>
  );
};
