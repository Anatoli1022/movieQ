import { getMovieInfo, getMovieTrailer, getMovieSimilar } from '@/app/lib/movieApi';
import Image from 'next/image';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
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
  let videos: Video[] = [];
  let similar: any 
  try {
    movie = await getMovieInfo(id);
    videos = await getMovieTrailer(id);
    similar = await getMovieSimilar(id);
  } catch (error) {
    console.error('Error in Home component:', error);
    return (
      <main>
        <h1>Произошла ошибка</h1>
        <p>{(error as Error).message}</p>
      </main>
    );
  }
  // console.log(movie);
  // console.log(similar);
  console.log(videos)
  const trailer = videos.find((video) => video.type === 'Trailer' && video.site === 'YouTube');
  return (
    <main className='ml-auto mr-auto flex max-w-7xl flex-col items-center'>
      {trailer && (
        <div>
          <iframe
            width='560'
            height='315'
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </div>
      )}

      {movie && (
        <>
          <h1 className='mt-6 text-2xl'>{movie?.title}</h1>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={200}
            height={300}
          />
          <p>{movie?.overview}</p>
        </>
      )}
      {similar &&
        similar.results.map((item: any) => {
          return <h2>{item.original_title}</h2>;
        })}
    </main>
  );
}
