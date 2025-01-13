import axios, { AxiosError } from 'axios';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { TestShared } from '@project/api-types';

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

interface TestPayload {
  readonly x: number;
}

export const client = {
  useTestMutation: () => {
    return useMutation<TestShared, AxiosError, TestPayload>({
      mutationKey: ['test-mutation'],
      mutationFn: async (payload) => {
        const response = await axios.get<TestShared>(`${root}/test`, {
          params: payload,
        });
        return response.data;
      },
    });
  },
  useTestQuery: () => {
    return useQuery<TestShared, AxiosError>({
      queryKey: ['test-query'],
      queryFn: async () => {
        const response = await axios.get<TestShared>(`${root}/test`);
        return response.data;
      },
    });
  },
};
