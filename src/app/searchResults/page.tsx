'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchMovieData } from '@/app/lib/movieApi';
import MovieList from '../components/MovieList';

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await searchMovieData(searchQuery, currentPage);
      setData(result);
    };

    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery, currentPage]);

  return (
    <div>
      {searchParams
        ? data && (
            <>
              <MovieList movies={data.results} />
            </>
          )
        : null}
    </div>
  );
};

export default SearchResultsPage;
