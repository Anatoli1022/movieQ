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

  let title = '';
  switch (type) {
    case 'popular':
      title = 'Popular Movies';
      break;
    case 'top_rated':
      title = 'Top Rated Movies';
      break;
    case 'upcoming':
      title = 'Coming Soon Movies';
      break;

  }

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
    <div className='mt-10'>
      {data && (
        <>
          <h2 className='text-center font-frank text-7xl font-normal'>{title}</h2>
          <div className='mt-6'>
            <MovieList movies={data.results} />
          </div>
          <Pagination currentPage={currentPage} totalPages={data.total_pages} searchQuery={searchQuery} type={type} />
        </>
      )}
    </div>
  );
};

export default SearchResultsPage;
