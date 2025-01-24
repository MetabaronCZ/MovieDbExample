import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MoviesFiltered, perPages } from '@project/api-types/lib/movie';

import { client } from 'modules/api';
import { usePaging } from 'hooks/usePaging';

import { Box } from 'components/common/Box';
import { Loader } from 'components/common/Loader';
import { Paging } from 'components/common/Paging';
import { MovieTable } from 'components/movie/MovieTable';

const perPageValues = [...perPages];

export const MovieList: FC = () => {
  const { t } = useTranslation();
  const [initialized, setInitialized] = useState(false);
  const [data, setData] = useState<MoviesFiltered>({ items: [], total: 0 });
  const { isPending, isError, mutateAsync } = client.useFetchMovies();

  const fetchData = useCallback(
    (page?: number, perPage?: number): Promise<unknown> => {
      return mutateAsync({ page, perPage }, { onSuccess: setData });
    },
    [mutateAsync],
  );

  const paging = usePaging({
    totalCount: data.total,
    perPages: perPageValues,
    onPage: (page, perPage) => {
      return fetchData(page, perPage);
    },
    onPerPage: (perPage) => {
      return fetchData(0, perPage);
    },
  });

  // initial data load
  useEffect(() => {
    if (initialized) {
      return;
    }
    void fetchData().finally(() => {
      setInitialized(true);
    });
  }, [initialized, fetchData]);

  return !initialized ? (
    <Loader />
  ) : (
    <Box>
      <MovieTable
        data={data.items}
        isLoading={isPending}
        error={isError ? t('error.fetch') : null}
      />
      <Paging paging={paging} />
    </Box>
  );
};
