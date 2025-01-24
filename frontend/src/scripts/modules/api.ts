import axios, { AxiosError } from 'axios';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { MovieFilter, FetchMoviesResponse } from '@project/api-types';

import { Logger } from './logger';
import { ParseFn } from 'modules/parse';
import { parseMovieResponse, parseMoviesResponse } from 'modules/movie';

const root = '/api';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      throwOnError: (error) => {
        if (!(error instanceof AxiosError)) {
          Logger.error(error);
        }
        return false;
      },
    },
  },
});

// query creator of "GET data for <T> detail"
const getDetailQuery = <T>(
  cacheKey: string,
  path: string,
  parse: ParseFn<T>,
) => {
  return (id: string) => {
    return useQuery<T | null, AxiosError, T | null>({
      queryKey: [cacheKey, id],
      queryFn: async () => {
        try {
          const response = await axios.get(`${root}${path}/${id}`);
          return parse(response.data);
        } catch (error) {
          // force HTTP 404 errors to return "null" (without throwing)
          if (error instanceof AxiosError && 404 === error.status) {
            return null;
          }
          throw error;
        }
      },
      enabled: !!id,
    });
  };
};

export const client = {
  useFetchMovies: () => {
    return useMutation<FetchMoviesResponse, AxiosError, MovieFilter>({
      mutationFn: async (filter) => {
        const response = await axios.get(`${root}/movie`, {
          params: filter,
        });
        return parseMoviesResponse(response.data);
      },
    });
  },
  useFetchMovie: getDetailQuery('movie', '/movie', parseMovieResponse),
};
