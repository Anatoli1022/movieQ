'use client';
import { useState, useEffect } from 'react';
import Roulette from '../components/Roulette';
import { getGenresMovie } from '../lib/movieApi';

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
