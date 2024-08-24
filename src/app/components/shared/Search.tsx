'use client';
import Link from 'next/link';
import { searchMovieData } from '@/app/lib/movieApi';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { MovieImage } from '@/app/components/shared/movieImage/MovieImage';
import type { Movie } from '@/app/types';

const Search = () => {
  const [data, setData] = useState<any>(null);
  const [searchFilm, setSearchFilm] = useState('');
  const [debouncedValue] = useDebounce(searchFilm, 400);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedValue) {
        const result = await searchMovieData(debouncedValue);
        setData(result.results);
      }
    };

    fetchData();
  }, [debouncedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilm(e.target.value);
  };
  const handleFocus = () => {
    setVisible(true);
  };

  const handleBlur = () => {
    setVisible(false);
  };

  return (
    <div className='relative z-10 w-full max-w-96'>
      <form>
        <input
          type='text'
          autoFocus
          onClick={handleFocus}
          value={searchFilm}
          onChange={handleChange}
          className='relative z-10 w-full rounded-md border border-gray-300 px-3 py-2 text-black'
          placeholder='Search movies...'
        />
      </form>{' '}
      {isVisible && searchFilm && data && (
        <div className='absolute w-full rounded-b-2xl bg-slate-900'>
          <ul className='-mt-1 grid w-full grid-cols-2 bg-slate-900'>
            {data.slice(0, 8).map((item: Movie) => (
              <li
                key={item.id}
                onClick={handleBlur}
                className='h-32 border-x border-b border-[#DDF6F2] border-opacity-25 p-2 transition first-of-type:mt-0 hover:bg-slate-500'
              >
                <Link href={`/movie/${item.id}`} className='flex gap-x-3'>
                  <MovieImage movie={item} width={70} height={100} />

                  <div className='flex max-w-24 flex-col justify-between'>
                    <p className='text-xs'>{item.title}</p>
                    <span className='block text-xs'>{item.release_date}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={{ pathname: '/searchResults', query: { search: searchFilm } }}
            onClick={handleBlur}
            className='block rounded-b-2xl border border-[#DDF6F2] border-opacity-25 p-1 text-center transition hover:bg-slate-500'
          >
            Show all results
          </Link>
        </div>
      )}
    </div>
  );
};

export default Search;
