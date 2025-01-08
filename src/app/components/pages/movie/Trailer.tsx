'use client';

import { useState, useEffect } from 'react';
import { fetchMovieData } from '@/app/lib/movieApi';
import type { Video } from '@/app/types';
import Image from 'next/image';
import noTrailerImage from '@/app/assets/noTrailer.svg';
import arrowsOpen from '@/app/assets/ArrowsOpen.svg';
import arrowOne from '@/app/assets/arrow.svg';

const Trailer = ({ id }: { id: string }) => {
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [activeButton, setActiveButton] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMovieData(id, '/videos');
        setVideos(response.results);
      } catch (error) {
        console.error('Error in Trailer component:', error);
      }
    };

    fetchData();
  }, []);

  const trailer = videos ? videos.find((video: Video) => video.type === 'Trailer' && video.site === 'YouTube') : null;
  const handleClickButton = () => setActiveButton((prevState) => !prevState);
  return (
    <div>
      {trailer ? (
        <>
          <div className='absolute inset-y-auto right-3 flex gap-x-4'>
            <a
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target='_blank'
              className={`flex items-center justify-center rounded-md bg-white p-2.5`}
            >
              <Image src={arrowOne} alt='' loading='eager' aria-hidden='true' />
            </a>
            <button
              onClick={() => handleClickButton()}
              type='button'
              className={`flex items-center justify-center rounded-md bg-white p-2.5`}
            >
              <Image src={arrowsOpen} alt='' loading='eager' aria-hidden='true' />
            </button>
          </div>
          <iframe
            className={`absolute inset-0 -z-[2] h-full max-h-[900px] w-full ${activeButton ? 'z-20 h-full max-h-full w-full brightness-100' : 'brightness-50'} transition-all duration-500`}
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`}
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
          {activeButton && (
            <div className='absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50'>
              <button onClick={handleClickButton} className='absolute right-4 top-4 text-4xl text-white'>
                X
              </button>
            </div>
          )}
        </>
      ) : (
        <div className='absolute inset-0 -z-[2] aspect-video h-full max-h-[900px] w-full brightness-50'>
          <Image
            src={noTrailerImage}
            alt='No trailer'
            className='absolute inset-0 -z-[2] aspect-video h-full max-h-[900px] w-full'
          />
        </div>
      )}
    </div>
  );
};

export default Trailer;
