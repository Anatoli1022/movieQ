'use client';

import Link from 'next/link';
import { searchMovieData } from '@/app/lib/movieApi';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

const Header = () => {
  const [data, setData] = useState<any>(null);
  const [searchFilm, setSearchFilm] = useState('');
  const [debouncedValue] = useDebounce(searchFilm, 600);
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
    <header className='sticky top-0 z-20 border-b border-[#DDF6F2] bg-slate-900 px-2 py-4'>
      <nav className='m-auto flex max-w-7xl justify-between'>
        <Link href={'/'}>MovieQ</Link>
        <div>
          <Link href={'/'}>Home</Link>
        </div>
      </nav>
      <form>
        <input
          type='text'
          // onBlur={handleBlur}
          // autoFocus
          onClick={handleFocus}
          value={searchFilm}
          onChange={handleChange}
          className='rounded-md border border-gray-300 px-3 py-2 text-black'
          placeholder='Search movies...'
        />
      </form>

      {isVisible && data && (
        <ul>
          {data.map((item: any) => (
            <li key={item.id} onClick={handleBlur}>
              <Link href={`/movie/${item.id}`}>
                <p>{item.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Header;
