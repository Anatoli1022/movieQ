'use client';

import { useState, useEffect } from 'react';
import { fetchMovieData } from '@/app/lib/movieApi';
import type { Video } from '@/app/types';
import Image from 'next/image';
import noTrailerImage from '@/app/assets/noTrailer.svg';

const Trailer = ({ id }: { id: string }) => {
  const [videos, setVideos] = useState<Video[] | null>(null);

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

  return (
    <div>
      {trailer ? (
        <iframe
          className='absolute inset-0 -z-[2] aspect-video h-full max-h-[900px] w-full brightness-50'
          src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
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
