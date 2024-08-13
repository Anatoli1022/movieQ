import { fetchMovieData } from '@/app/lib/movieApi';
import Image from 'next/image';
import SwiperMovie from '@/app/components/swiperMovie';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  original_language: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
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
              <p>
                Average rating:
                <span className='ml-2'>{movie.vote_average}</span>
              </p>
              <p className='mt-1'>
                Number of votes:
                <span className='ml-2'>{movie.vote_count}</span>
              </p>
              <p className='mt-1'>
                Release date:
                <span className='ml-2'>{movie.release_date}</span>
              </p>
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
