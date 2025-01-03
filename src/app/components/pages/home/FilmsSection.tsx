import SwiperMovie from '@/app/components/shared/swiperMovie';
import type { Movie } from '@/app/types';
import Link from 'next/link';
import { fetchMovieData } from '@/app/lib/movieApi';

interface FilmsSectionProps {
  title: string;
  endpoint: string;
}

const FilmsSection = async ({ title, endpoint }: FilmsSectionProps) => {
  let data: Movie[] | null = null;

  try {
    const response = await fetchMovieData(endpoint);
    data = response.results;
  } catch (error) {
    console.error(`Error in ${endpoint} component:`, error);
  }

  return (
    <section>
      <div className='flex items-center'>
        <h2 className='font-frank text-5xl font-normal'>{title}</h2>
        <Link
          className='m-auto leading-4 block border-b border-white font-frank text-xl'
          href={{ pathname: '/searchResults', query: { type: endpoint } }}
        >
          Discover more
        </Link>
      </div>
      {data && (
        <div className='mt-5'>
          <SwiperMovie movieData={data} />
        </div>
      )}
    </section>
  );
};

export default FilmsSection;
