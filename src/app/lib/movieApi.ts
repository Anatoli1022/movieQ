// endpoints
// 'upcoming';
// 'top_rated';
//'popular';

//additionalPath
//  '/videos';
//  '/similar';

export async function fetchMovieData(endpoint: string, additionalPath: string = '', page: string | number = 1) {
  const apiKey = process.env.NEXT_API_MOVIE_KEY;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${endpoint}${additionalPath}?language=en-US&page=${page}`,
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

export async function getGenresMovie() {
  const apiKey = process.env.NEXT_API_MOVIE_KEY;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en`, options);

  if (!res.ok) {
    console.error('Failed to fetch data:', res.status, res.statusText);
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function discoverSearch(genres: number , currentPage: string | number = 1) {
  const apiKey = process.env.NEXT_API_MOVIE_KEY;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&with_genres=${genres}`,
    options,
  );

  if (!res.ok) {
    console.error('Failed to fetch data:', res.status, res.statusText);
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
