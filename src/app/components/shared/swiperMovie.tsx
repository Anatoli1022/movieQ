'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface ApiResponse {
  results: Movie[];
}

const SwiperMovie = ({ movieData }: { movieData: ApiResponse | null }) => {
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
      {movieData &&
        movieData.results.map((movie: any) => {
          return (
            <SwiperSlide key={movie.id}>
              <Link href={`/movie/${movie.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={300}
                />
              </Link>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default SwiperMovie;
