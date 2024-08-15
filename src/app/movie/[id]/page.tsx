import type { Metadata } from 'next';
import Image from 'next/image';
import { fetchMovieData } from '@/app/lib/movieApi';
import SwiperMovie from '@/app/components/swiperMovie';

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = params;
  let movie: Movie | null = null;

  try {
    movie = await fetchMovieData(id);
  } catch (error) {
    console.error('Error fetching movie data:', error);
  }
  const title = movie ? movie.title : 'Movie Details';
  const description = movie ? movie.overview : 'Movie details page';
  return {
    title,
    description,
  };
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  original_language: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genres: [{ id: number; name: string }];
  production_companies: [{ id: number; name: string; logo_path: string }];
  production_countries: [{ name: string }];
}
interface VideoResponse {
  id: number;
  results: Video[];
}
interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

type Params = { id: string };

export default async function MoviePage({ params }: { params: Params }) {
  const { id } = params;
  let movie: Movie | null = null;
  let videos: VideoResponse;
  let similar: any;
  try {
    movie = await fetchMovieData(id);
    videos = await fetchMovieData(id, '/videos');
    similar = await fetchMovieData(id, '/similar');
  } catch (error) {
    console.error('Error in Home component:', error);
    return (
      <div>
        <h1>Произошла ошибка</h1>
        <p>{(error as Error).message}</p>
      </div>
    );
  }

  const trailer = videos.results.find((video: Video) => video.type === 'Trailer' && video.site === 'YouTube');
  return (
    <div className='pb-4'>
      {movie && (
        <>
          <h1 className='text-2xl'>{movie.title}</h1>
          <div className='mt-3 flex gap-x-5'>
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={300}
              height={400}
            />
            <div>
              <div>
                <span className='font-semibold'> Average rating:</span>
                <span className='ml-2'>{movie.vote_average}</span>
              </div>
              <div className='mt-2'>
                <span className='font-semibold'>Number of votes:</span>
                <span className='ml-2'>{movie.vote_count}</span>
              </div>
              <div className='mt-2'>
                <span className='font-semibold'>Release date:</span>
                <span className='ml-2'>{movie.release_date}</span>
              </div>
              <div className='mt-2 flex'>
                <span className='font-semibold'>Genres:</span>
                <ul className='ml-2 flex gap-x-2'>
                  {movie.genres.map((item, i) => (
                    <li key={item.id}>
                      {item.name}
                      {movie.genres.length - 1 === i ? '.' : ','}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='mt-2 flex'>
                <span className='text-nowrap font-semibold'>Production companies:</span>
                <ul className='ml-2 flex flex-wrap items-center gap-x-2 gap-y-1'>
                  {movie.production_companies.map((item, i) => (
                    <li key={item.id}>
                      <span>
                        {item.name}
                        {movie.production_companies.length - 1 === i ? '.' : ','}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='mt-2 flex'>
                <span className='font-semibold'>Production countries:</span>
                <ul className='ml-2 flex gap-x-2'>
                  {movie.production_countries.map((item, i) => (
                    <li key={i}>
                      <span>
                        {item.name}
                        {movie.production_countries.length - 1 === i ? '.' : ','}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className='mt-4'>{movie.overview}</p>
            </div>
          </div>
        </>
      )}
      {trailer && (
        <div className='mt-10'>
          <iframe
            width='660'
            height='415'
            className='m-auto'
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
      )}
      <div className='mt-8'>
        <h3 className='text-3xl'>You may also like...</h3>

        <SwiperMovie movieData={similar} />
      </div>
    </div>
  );
}
