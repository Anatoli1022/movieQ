import Link from 'next/link';
import { Suspense } from 'react';
import Search from './Search';

const Header = () => {
  return (
    <header className='sticky top-0 z-20 border-b border-[#DDF6F2] bg-slate-900 px-2 py-4'>
      <nav className='m-auto flex max-w-7xl items-center justify-between'>
        <Link href={'/'}>MovieQ</Link>
        <Suspense>
          <Search />
        </Suspense>
        <div>
          <Link href={'/'}>Home</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
