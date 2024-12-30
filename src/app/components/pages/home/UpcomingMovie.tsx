'use client';

import SwiperMovie from '@/app/components/shared/swiperMovie';
import type { Movie } from '@/app/types';
import { useEffect, useState } from 'react';
import { fetchMovieData } from '@/app/lib/movieApi';

const UpcomingMovie = () => {
  const [upcomingMovie, setUpcomingMovie] = useState<Movie[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMovieData('upcoming');
        setUpcomingMovie(response.results);
      } catch (error) {
        console.error('Error in Popular component:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <h2 className='font-frank text-4xl font-normal'>Upcoming movies</h2>
      {upcomingMovie && (
        <div className='mt-5'>
          <SwiperMovie movieData={upcomingMovie} />
        </div>
      )}
    </section>
  );
};

export default UpcomingMovie;
