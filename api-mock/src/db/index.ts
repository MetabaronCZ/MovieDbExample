import { Movie, MovieFilter } from '@project/api-types';
import { createMovieData, getMovies } from 'db/movies';

export interface Db {
  readonly movies: {
    readonly get: (filter?: MovieFilter) => Movie[];
  };
}

export const initDb = async (): Promise<Db> => {
  const movies = await createMovieData();
  return {
    movies: {
      get: (filter) => getMovies(movies, filter),
    },
  };
};
