import { Movie, MovieFilter } from '@project/api-types';

// movie ID counter
let movieId = 0;

const files = [
  'movies-1900s.json',
  'movies-1910s.json',
  'movies-1920s.json',
  'movies-1930s.json',
  'movies-1940s.json',
  'movies-1950s.json',
  'movies-1960s.json',
  'movies-1970s.json',
  'movies-1980s.json',
  'movies-1990s.json',
  'movies-2000s.json',
  'movies-2010s.json',
  'movies-2020s.json',
];
const filesRoot = './../data';

export const createMovieData = async (): Promise<Movie[]> => {
  let movies: Movie[] = [];

  for (const filename of files) {
    const path = `${filesRoot}/${filename}`;
    const json = (await import(path)) as { default?: Movie[] };

    if (!json.default) {
      console.error(`Could not import movie data for "${path}"!`);
      continue;
    }
    const data = json.default.map((item) => ({
      ...item,
      id: `MOVIE-${movieId++}`,
    }));
    movies = movies.concat(data);
  }
  return movies;
};

export const getMovies = (movies: Movie[], filter?: MovieFilter): Movie[] => {
  // ...
  if (filter?.query) {
    /* */
  }
  return movies;
};
