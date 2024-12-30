'use client';

import Link from 'next/link';
import { MovieImage } from '@/app/components/shared/movieImage/MovieImage';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import type { Movie } from '@/app/types';

const SwiperMovie = ({ movieData }: { movieData: Movie[]  }) => {
  return (
    <Swiper
      slidesPerView={6}
      spaceBetween={15}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode]}
      className='mySwiper mt-3 max-w-7xl'
    >
      {
        movieData.map((movie: Movie) => (
          <SwiperSlide key={movie.id}>
            <Link href={`/movie/${movie.id}`}>
              <MovieImage movie={movie} width={200} height={300} />
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default SwiperMovie;
