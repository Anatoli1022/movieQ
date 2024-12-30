'use client';

import SwiperMovie from '@/app/components/shared/swiperMovie';
import type { Movie } from '@/app/types';
import { useEffect, useState } from 'react';
import { fetchMovieData } from '@/app/lib/movieApi';

const TopRatedMovie = () => {
  const [topRatedMovie, setTopRatedMovie] = useState<Movie[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMovieData('top_rated');
        setTopRatedMovie(response.results);
      } catch (error) {
        console.error('Error in Popular component:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <h2 className='font-frank text-4xl font-normal'>Top rated movie</h2>
      {topRatedMovie && (
        <div className='mt-5'>
          <SwiperMovie movieData={topRatedMovie} />
        </div>
      )}
    </section>
  );
};

export default TopRatedMovie;
