'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchMovieData } from '@/app/lib/movieApi';
import Pagination from '@/app/components/Pagination';
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
    <Suspense fallback={<p>Loading films...</p>}>
      <div>
        {data && (
          <>
            <MovieList movies={data.results} />
            <Pagination currentPage={currentPage} totalPages={data.total_pages} searchQuery={searchQuery} />
          </>
        )}
      </div>
    </Suspense>
  );
};

export default SearchResultsPage;
