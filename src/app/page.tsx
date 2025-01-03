import type { Metadata } from 'next';

import Hero from '@/app/components/pages/home/Hero';
import FilmsSection from './components/pages/home/FilmsSection';

export const metadata: Metadata = {
  title: 'Home',
};

export const runtime = 'edge';

export default async function Home() {
  return (
    <div className='mt-10 flex flex-col gap-10 overflow-hidden'>
      <Hero />
      <FilmsSection title={'Popular movies'} endpoint={'popular'} />
      <FilmsSection title={'Top rated movie'} endpoint={'top_rated'} />
      <FilmsSection title={'Coming soon'} endpoint={'upcoming'} />
    </div>
  );
}
