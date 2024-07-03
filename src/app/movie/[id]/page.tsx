'use client';

import { useEffect, useState } from 'react';

interface Movie {
  id: number;
  title: string;
  overview: string;
}

type Params = { id: string };

export default function MoviePage({ params }: { params: Params }) {
  const { id } = params;

  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const apiKey = process.env.NEXT_API_MOVIE_KEY;

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      };

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          options
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Movie = await response.json();
        setMovie(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    if (id) fetchMovie();
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!movie) return <p>Loading...</p>;

  return (
    <main>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
    </main>
  );
}
