import axios, { AxiosError } from 'axios';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';

import { Logger } from 'modules/logger';
import { ParseFn } from 'modules/parse';

export const apiRoot = '/api';

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

// query creator of "GET data for <T[]> list"
export const getListQuery = <T, U>(
  cacheKey: string,
  path: string,
  parse: ParseFn<T>,
) => {
  return () => {
    return useMutation<T, AxiosError, U>({
      mutationFn: async (filter) => {
        const response = await axios.get(`${apiRoot}${path}`, {
          params: filter,
        });
        return parse(response.data);
      },
    });
  };
};

// query creator of "GET data for <T> detail"
export const getDetailQuery = <T>(
  cacheKey: string,
  path: string,
  parse: ParseFn<T>,
) => {
  return (id: string) => {
    return useQuery<T | null, AxiosError, T | null>({
      queryKey: [cacheKey, id],
      queryFn: async () => {
        try {
          const response = await axios.get(`${apiRoot}${path}/${id}`);
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
