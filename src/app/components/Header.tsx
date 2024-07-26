import Link from 'next/link';

const Header = () => {
  return (
    <header className='sticky top-0 z-20 border-b border-[#DDF6F2] px-2 py-4 bg-slate-900'>
      <nav className='m-auto flex max-w-7xl justify-between'>
        <Link href={'/'}>MovieQ</Link>
        <div>
          <Link href={'/'}>Home</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
