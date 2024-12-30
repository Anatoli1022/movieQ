'use client';
import { useState, useEffect } from 'react';
import { getGenresMovie } from '../../lib/movieApi';
import dynamic from 'next/dynamic';

const Roulette = dynamic(() => import('../../components/Roulette'), {
  ssr: false,
});

const Page = () => {
  const [genresMovie, setGenresMovie] = useState<{ id: number; name: string }[] | null>(null);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const genres = await getGenresMovie();
        setGenresMovie(genres.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    getGenres();
  }, []);

  return <div>{genresMovie && <Roulette data={genresMovie} />}</div>;
};

export default Page;
