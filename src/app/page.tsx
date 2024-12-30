import type { Metadata } from 'next';

import Popular from '@/app/components/pages/home/Popular';
import TopRatedMovie from '@/app/components/pages/home/TopRatedMovie';
import UpcomingMovie from '@/app/components/pages/home/UpcomingMovie';
import Hero from '@/app/components/pages/home/Hero';

export const metadata: Metadata = {
  title: 'Home',
};

export const runtime = 'edge';

export default async function Home() {
  return (
    <div className='flex flex-col gap-10 overflow-hidden'>
      <Hero />
      <Popular />
      <TopRatedMovie />
      <UpcomingMovie />
    </div>
  );
}
