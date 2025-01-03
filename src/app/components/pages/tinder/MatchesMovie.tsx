'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import close from '@/app/assets/close.svg';
import star from '@/app/assets/star.svg';
import type { Movie } from '@/app/types';
interface MovieListProps {
  movies: Movie[];
}

const MatchesMovie = ({ movies }: MovieListProps) => {
  const [active, setActive] = useState(false);

  const toggleACtive = (boolean: boolean) => setActive(boolean);
  return (
    <div className={`absolute right-0 top-0 ${active ? 'w-[40%]' : ''}`}>
      {!active && (
        <button
          onClick={() => toggleACtive(true)}
          type='button'
          className='relative flex items-center justify-center rounded-md bg-white p-2'
        >
          <Image src={star} alt='' loading='lazy' className='-mr-1 block h-[30px] w-[30px]' aria-hidden='true' />
          <span className='absolute bottom-[6px] right-[2px] rounded-full border-2 border-lightBlue bg-white px-[4px] text-center text-xs text-lightBlue'>
            {movies.length}
          </span>
        </button>
      )}
      {active && (
        <div className='rounded-md bg-white px-2.5 py-7'>
          <div className='flex items-center justify-between'>
            <h2 className='font-frank text-3xl text-lightBlue'>List of matches</h2>
            <button onClick={() => toggleACtive(false)} type='button' className='rounded-md bg-lightBlue p-2.5'>
              <Image src={close} alt='' loading='lazy' aria-hidden='true' />
            </button>
          </div>

          <ul className='mt-9 flex flex-col gap-y-1'>
            {movies.map((movie) => (
              <li key={movie.id} className='border-b border-black/30'>
                <Link href={`/movie/${movie.id}`}>
                  <h3 className='text-lg text-lightBlue'>{movie.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MatchesMovie;
