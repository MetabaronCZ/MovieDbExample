import axios, { AxiosError } from 'axios';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { FetchMoviesResponse } from '@project/api-types';

import { Logger } from './logger';

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

export const client = {
  useFetchMovies: () => {
    return useQuery<FetchMoviesResponse, AxiosError>({
      queryKey: ['movies'],
      queryFn: async () => {
        const response = await axios.get<FetchMoviesResponse>(`${root}/movie`);
        return response.data;
      },
    });
  },
};
