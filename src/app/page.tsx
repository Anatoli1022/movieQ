'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
}

interface ApiResponse {
  results: Movie[];
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_API_MOVIE_KEY}`,
        },
      };

      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
          options
        );
        const data: ApiResponse = await response.json();
        setMovies(data.results);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    console.log(movies);
    fetchMovies();
  }, []);

  return (
    <main>
      <h1>Popular Movies</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
