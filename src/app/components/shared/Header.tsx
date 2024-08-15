'use client';
import Link from 'next/link';
import { searchMovieData } from '@/app/lib/movieApi';
import { useState } from 'react';

const Header = () => {
  const [data, setData] = useState<any>(null);
  const handleSearchSubmit = async (e: any) => {
    e.preventDefault();

    const result = await searchMovieData(e.target.value);
    console.log(result.results);
    setData(result.results);
  };

  return (
    <header className='sticky top-0 z-20 border-b border-[#DDF6F2] bg-slate-900 px-2 py-4'>
      <nav className='m-auto flex max-w-7xl justify-between'>
        <Link href={'/'}>MovieQ</Link>
        <div>
          <Link href={'/'}>Home</Link>
        </div>
      </nav>
      <form
        action='
     '
      >
        <input
          type='text'
          onChange={handleSearchSubmit}
          className='rounded-md border border-gray-300 px-3 py-2 text-black'
          placeholder='Search movies...'
        />
      </form>

      {data && (
        <ul>
          {data.map((item: any) => {
            return (
              <li key={item.id}>
                <Link href={`/movie/${item.id}`}>
                  <p>{item.title}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
};

export default Header;
