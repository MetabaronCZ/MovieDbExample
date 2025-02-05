import {
  Movie,
  Person,
  MovieData,
  MovieFilter,
  PersonFilter,
  MoviesFiltered,
  PeopleFiltered,
} from '@project/api-types';

import { createPeopleData, getPeople, getPerson } from 'db/people';
import { createMovieData, editMovie, getMovie, getMovies } from 'db/movies';

export interface Db {
  readonly movie: {
    readonly getList: (filter?: MovieFilter) => MoviesFiltered;
    readonly getDetail: (id: string) => Movie | null;
    readonly edit: (id: string, data: MovieData) => Movie | null;
  };
  readonly person: {
    readonly getList: (filter?: PersonFilter) => PeopleFiltered;
    readonly getDetail: (id: string) => Person | null;
  };
}

export const createDb = async (): Promise<Db> => {
  const movies = await createMovieData();
  const people = createPeopleData(movies);
  return {
    movie: {
      getList: (filter) => getMovies(movies, filter),
      getDetail: (id) => getMovie(movies, id),
      edit: (id, data) => editMovie(movies, people, id, data),
    },
    person: {
      getList: (filter) => getPeople(people, filter),
      getDetail: (id) => getPerson(people, id),
    },
  };
};
