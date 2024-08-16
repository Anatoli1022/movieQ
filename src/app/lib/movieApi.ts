interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

// endpoints
const upcoming = 'upcoming';
const top_rated = 'top_rated';
const popular = 'popular';

//additionalPath
const videos = '/videos';
const similar = '/similar';

export async function fetchMovieData(endpoint: string, additionalPath: string = '') {
  const apiKey = process.env.NEXT_API_MOVIE_KEY;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${endpoint}${additionalPath}?language=en-US&page=1`,
    options,
  );

  if (!res.ok) {
    console.error('Failed to fetch data:', res.status, res.statusText);
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function searchMovieData(query: string, currentPage: string | number = 1) {
  const apiKey = process.env.NEXT_API_MOVIE_KEY;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&page=${currentPage}`, options);

  if (!res.ok) {
    console.error('Failed to fetch data:', res.status, res.statusText);
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
