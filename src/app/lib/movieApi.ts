interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export async function getMovieInfo(id: string) {
  const apiKey = process.env.NEXT_API_MOVIE_KEY;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
  if (!res.ok) {
    console.error('Failed to fetch data:', res.status, res.statusText);

    throw new Error('Failed to fetch data getMovieInfo');
  }

  return res.json();
}

export async function getMovieTrailer(movieId: string): Promise<Video[]> {
  const apiKey = process.env.NEXT_API_MOVIE_KEY;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options);

  if (!res.ok) {
    throw new Error('Failed to fetch video data getMovieTrailer');
  }

  const videoResponse = await res.json();
  return videoResponse.results;
}

export async function getMovieSimilar(id: string) {
  const apiKey = process.env.NEXT_API_MOVIE_KEY;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`, options);
  if (!res.ok) {
    console.error('Failed to fetch data:', res.status, res.statusText);

    throw new Error('Failed to fetch data getMovieSimilar');
  }

  return res.json();
}
