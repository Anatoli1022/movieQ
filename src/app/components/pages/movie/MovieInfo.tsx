'use client';
import { useState, useEffect } from 'react';
import { fetchMovieData } from '@/app/lib/movieApi';
import type { Movie } from '@/app/types';

const MovieInfo = ({ id }: { id: string }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [activeButton, setActiveButton] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMovieData(id);
        setMovie(response);
      } catch (error) {
        console.error('Error in MovieInfo component:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleClickButton = (index: number) => setActiveButton(index);

  return (
    <div className='relative flex aspect-video w-full items-center justify-center'>
      {movie && (
        <>
          {activeButton === 1 && (
            <div className='flex flex-col items-center justify-center gap-y-8'>
              <h1 className='text-center text-7xl font-bold'>{movie.title}</h1>
              <p className='max-w-2xl text-center text-lg'>{movie.overview}</p>
              <ul className='flex items-center gap-x-4 rounded-xl bg-white/60 px-2.5 py-1 text-sm'>
                {movie.genres.map((item) => (
                  <li key={item.id} className='text-lightBlue'>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeButton === 2 && (
            <div className='flex flex-col items-center justify-center gap-y-5'>
              <div className='flex items-center justify-center gap-x-2.5'>
                <div className='rounded-3xl bg-white/50 px-3 py-1 text-lg'>
                  <span className='font-semibold'> Rating</span>
                  <span className='ml-2'>{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className='rounded-3xl bg-white/50 px-3 py-1 text-lg'>
                  <span className='font-semibold'>Votes</span>
                  <span className='ml-2'>{movie.vote_count}</span>
                </div>
              </div>
              <h1 className='text-center text-4xl font-bold'>{movie.title}</h1>
              <div className='flex w-full justify-between gap-x-5'>
                <div>
                  <h2 className='font-frank text-xl font-bold uppercase'>Production countries</h2>
                  <ul className='mt-2.5 flex flex-col gap-y-2'>
                    {movie.production_countries.map((item, i) => (
                      <li key={i}>
                        <span className='text-md'>
                          {item.name}
                          {movie.production_countries.length - 1 === i ? '.' : ','}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className='font-frank text-xl font-bold uppercase'>Production companies</h2>
                  <ul className='mt-2.5'>
                    {movie.production_companies.map((item, i) => (
                      <li key={item.id}>
                        <span>
                          {item.name}
                          {movie.production_companies.length - 1 === i ? '.' : ', '}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className='font-frank text-xl font-bold uppercase'>Release date</h2>
                  <span className='text-md mt-2.5 block'>{movie.release_date}</span>
                </div>
                <div className='max-w-80'>
                  <h2 className='font-frank text-xl font-bold uppercase'>Description</h2>
                  <p className='text-md mt-2.5'>{movie.overview}</p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <div className='absolute -bottom-9 left-3'>
        <button
          onClick={() => handleClickButton(1)}
          type='button'
          className={`rounded-[90px] border border-white px-5 py-2.5 text-sm transition hover:bg-white hover:text-black ${
            activeButton === 1 ? 'bg-white text-black' : ''
          }`}
        >
          Movie
        </button>
        <button
          onClick={() => handleClickButton(2)}
          type='button'
          className={`rounded-[90px] border border-white px-5 py-2.5 text-sm transition hover:bg-white hover:text-black ${
            activeButton === 2 ? 'bg-white text-black' : ''
          }`}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default MovieInfo;
