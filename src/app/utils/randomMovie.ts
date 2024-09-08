import { fetchMovieData } from '../lib/movieApi';

export const getRandomMovie = async () => {
  const arrApi = ['popular', 'top_rated'];
  const getRandomNum = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  const category = arrApi[getRandomNum(arrApi.length)];
  const randomPage = getRandomNum(480);
  try {
    const result = await fetchMovieData(category, '', randomPage);
    if (result && result.results.length > 0) {
      const randomMovie = result.results[getRandomNum(result.results.length)];
      console.log(randomMovie);
      return randomMovie;
    }
  } catch (error) {
    console.error('Error in Home component:', error);
  }

};
