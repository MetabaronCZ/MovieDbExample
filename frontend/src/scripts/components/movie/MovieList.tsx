import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  perPages,
  movieSorts,
  MovieFilter,
  MoviesFiltered,
  MovieSort,
} from '@project/api-types';

import { client } from 'modules/api';
import { Logger } from 'modules/logger';
import { usePaging } from 'hooks/usePaging';

import { Box } from 'components/common/Box';
import { Loader } from 'components/common/Loader';
import { Paging } from 'components/common/Paging';
import { MovieTable } from 'components/movie/MovieTable';

const perPageValues = [...perPages];
const movieSortValues = [...movieSorts] as string[];

const isMovieStort = (value: string): value is MovieSort => {
  return movieSortValues.includes(value);
};

export const MovieList: FC = () => {
  const { t } = useTranslation();
  const [initialized, setInitialized] = useState(false);
  const [filter, setFilter] = useState<MovieFilter>({});
  const [data, setData] = useState<MoviesFiltered>({ items: [], total: 0 });
  const { isPending, isError, mutateAsync } = client.useFetchMovies();

  const fetchData = useCallback(
    (filterChanges?: Partial<MovieFilter>): Promise<unknown> => {
      const filterData = { ...filter, ...filterChanges };

      return mutateAsync(filterData, {
        onSuccess: (response) => {
          setData(response);
          setFilter(filterData);
          setInitialized(true);
        },
      });
    },
    [filter, mutateAsync],
  );

  const paging = usePaging({
    page: filter.page,
    totalCount: data.total,
    perPages: perPageValues,
    onPage: (page, perPage) => {
      return fetchData({ page, perPage });
    },
    onPerPage: (perPage) => {
      return fetchData({ page: 0, perPage });
    },
  });

  // initial data load
  useEffect(() => {
    if (!initialized) {
      void fetchData();
    }
  }, [initialized, fetchData]);

  return !initialized ? (
    <Loader />
  ) : (
    <Box>
      <MovieTable
        data={data.items}
        isLoading={isPending}
        error={isError ? t('error.fetch') : null}
        sort={filter.sort}
        sortDirection={filter.sortDirection}
        onSort={(sort, sortDirection) => {
          if (isMovieStort(sort)) {
            void fetchData({ sort, sortDirection, page: 0 });
          } else {
            Logger.error(`Could not sort movies: Invalid sort "${sort}"!`);
          }
        }}
      />
      <Paging paging={paging} />
    </Box>
  );
};
