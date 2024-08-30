
// endpoints
// 'upcoming';
// 'top_rated';
//'popular';

//additionalPath
//  '/videos';
//  '/similar';


export async function fetchTvData(endpoint: string, additionalPath: string = '', page: string | number = 1) {
  const apiKey = process.env.NEXT_API_MOVIE_KEY;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${endpoint}${additionalPath}?language=en-US&page=${page}`,
    options,
  );

  if (!res.ok) {
    console.error('Failed to fetch data:', res.status, res.statusText);
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function searchTvData(query: string, currentPage: string | number = 1) {
  const apiKey = process.env.NEXT_API_MOVIE_KEY;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const res = await fetch(`https://api.themoviedb.org/3/search/tv?query=${query}&page=${currentPage}`, options);

  if (!res.ok) {
    console.error('Failed to fetch data:', res.status, res.statusText);
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
