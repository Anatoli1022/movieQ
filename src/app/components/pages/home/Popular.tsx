'use client';

import SwiperMovie from '@/app/components/shared/swiperMovie';
import type { Movie } from '@/app/types';
import { useEffect, useState } from 'react';
import { fetchMovieData } from '@/app/lib/movieApi';
const Popular = () => {
  const [popularMovie, setPopularMovie] = useState<Movie[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMovieData('popular');
        setPopularMovie(response.results);
      } catch (error) {
        console.error('Error in Popular component:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <h2 className='font-frank text-4xl font-normal'>Popular movies</h2>
      {popularMovie && (
        <div className='mt-5'>
          <SwiperMovie movieData={popularMovie} />
        </div>
      )}
    </section>
  );
};

export default Popular;
