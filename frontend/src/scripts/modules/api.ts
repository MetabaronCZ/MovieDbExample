import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import {
  MovieFilter,
  PersonFilter,
  EditMoviePayload,
  FetchMoviesResponse,
  FetchPeopleResponse,
} from '@project/api-types';

import { apiRoot, getDetailQuery, getListQuery } from 'modules/query';
import { parseMovieResponse, parseMoviesResponse } from 'modules/movie';
import { parsePeopleResponse, parsePersonResponse } from 'modules/person';

export const client = {
  // movie
  useFetchMovies: getListQuery<FetchMoviesResponse, MovieFilter>(
    'movies',
    '/movie',
    parseMoviesResponse,
  ),
  useFetchMovie: getDetailQuery('movie', '/movie', parseMovieResponse),
  useEditMovie: () => {
    return useMutation<unknown, AxiosError, EditMoviePayload>({
      mutationFn: async ({ id, data }) => {
        return await axios.patch(`${apiRoot}/movie/${id}`, data);
      },
    });
  },

  // person
  useFetchPeople: getListQuery<FetchPeopleResponse, PersonFilter>(
    'people',
    '/person',
    parsePeopleResponse,
  ),
  useFetchPerson: getDetailQuery('person', '/person', parsePersonResponse),
};
