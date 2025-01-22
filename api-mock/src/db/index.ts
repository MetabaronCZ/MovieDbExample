import { Movie, MovieFilter, MoviesFiltered } from '@project/api-types';
import { createMovieData, getMovie, getMovies } from 'db/movies';

export interface Db {
  readonly movies: {
    readonly getList: (filter?: MovieFilter) => MoviesFiltered;
    readonly getDetail: (id: string) => Movie | null;
  };
}

export const createDb = async (): Promise<Db> => {
  const movies = await createMovieData();
  return {
    movies: {
      getList: (filter) => getMovies(movies, filter),
      getDetail: (id) => getMovie(movies, id),
    },
  };
};
