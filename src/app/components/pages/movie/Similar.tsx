'use client';
import { useState, useEffect } from 'react';
import type { Movie } from '@/app/types';
import SwiperMovie from '@/app/components/shared/swiperMovie';
import { fetchMovieData } from '@/app/lib/movieApi';

const Similar = ({ id }: { id: string }) => {
  const [similar, setSimilar] = useState<Movie[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const similar = await fetchMovieData(id, '/similar');
        setSimilar(similar.results);
      } catch (error) {
        console.error('Error in Popular component:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className='mt-8'>
      {similar ? (
        <>
          <h3 className='font-frank text-4xl font-normal'>You'll like it</h3>
          <SwiperMovie movieData={similar} />
        </>
      ) : (
        <h3 className='font-frank text-4xl font-normal'>No similar films were found.</h3>
      )}
    </section>
  );
};

export default Similar;
