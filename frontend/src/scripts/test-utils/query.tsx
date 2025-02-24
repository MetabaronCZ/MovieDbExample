import { FC, PropsWithChildren, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const TestQueryWrapper: FC<PropsWithChildren> = ({ children }) => {
  // create query client every time to prevent data caching in tests
  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
          throwOnError: () => false,
        },
      },
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
