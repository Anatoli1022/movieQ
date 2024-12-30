'use client';
import { useState, useEffect } from 'react';

import { fetchMovieData } from '@/app/lib/movieApi';
import type {  Video } from '@/app/types';
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
        console.error('Error in Popular component:', error);
      }
    };

    fetchData();
  }, []);

  const trailer = videos ? videos.find((video: Video) => video.type === 'Trailer' && video.site === 'YouTube') : null;
  return (
    <div className='mt-10'>
      {trailer ? (
        <iframe
          width='660'
          height='415'
          className='m-auto'
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      ) : (
        <Image src={noTrailerImage} alt={'No trailer'} width={660} height={415} className='m-auto block rounded-lg' />
      )}
    </div>
  );
};

export default Trailer;
