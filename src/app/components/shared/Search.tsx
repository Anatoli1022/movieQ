'use client';
import search from '@/app/assets/search.svg';
import Link from 'next/link';
import { searchMovieData } from '@/app/lib/movieApi';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { MovieImage } from '@/app/components/shared/movieImage/MovieImage';
import type { Movie } from '@/app/types';
import Image from 'next/image';

const Search = () => {
  const [data, setData] = useState<any>(null);
  const [searchFilm, setSearchFilm] = useState('');
  const [debouncedValue] = useDebounce(searchFilm, 400);
  const [isVisible, setVisible] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false);

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

  const handleVisibleForm = () => setVisibleForm((prevState) => !prevState);

  return (
    <div className='relative z-10 ml-4 w-full max-w-[400px]'>
      <div className='flex w-full items-center gap-x-5'>
        <Image src={search} alt='' aria-hidden='true' onClick={handleVisibleForm} className='cursor-pointer' />
        {visibleForm && (
          <search>
            <form className='relative'>
              <input
                type='text'
                autoFocus
                onClick={handleFocus}
                value={searchFilm}
                onChange={handleChange}
                className='placeholder-white::placeholder relative z-10 w-[360px] rounded-md border border-white bg-lightBlue text-white'
                placeholder='Search movies...'
              />
            </form>
          </search>
        )}
      </div>
      {isVisible && visibleForm && searchFilm && data && (
        <div className='absolute w-[400px] rounded-b-2xl bg-lightBlue'>
          <ul className='-mt-1 grid w-full grid-cols-2 bg-lightBlue'>
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
