'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchMovieData, discoverSearch, fetchMovieData } from '@/app/lib/movieApi';
import Pagination from '@/app/components/Pagination';
import MovieList from '../../components/MovieList';

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || '';
  const searchQuery = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      let result;
      if (type) {
        result = await fetchMovieData(type, '', currentPage);
      } else if (searchQuery && isNaN(Number(searchQuery))) {
        result = await searchMovieData(searchQuery, currentPage);
      } else {
        result = await discoverSearch(Number(searchQuery), currentPage);
      }

      setData(result);
    };

    fetchData();
  }, [type, searchQuery, currentPage]);

  return (
    <div className='mt-10 pb-4'>
      {data && (
        <>
          <MovieList movies={data.results} />
          <Pagination currentPage={currentPage} totalPages={data.total_pages} searchQuery={searchQuery} />
        </>
      )}
    </div>
  );
};

export default SearchResultsPage;
