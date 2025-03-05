import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  perPages,
  PersonSort,
  personSorts,
  PersonFilter,
  PeopleFiltered,
  defaultPersonSort,
} from '@project/api-types';

import { client } from 'modules/api';
import { Logger } from 'modules/logger';
import { usePaging } from 'hooks/usePaging';

import { Box } from 'components/common/Box';
import { Loader } from 'components/common/Loader';
import { Paging } from 'components/common/Paging';
import { PersonTable } from 'components/person/PersonTable';

const perPageValues = [...perPages];
const personSortValues = [...personSorts] as string[];

const isPersonStort = (value: string): value is PersonSort => {
  return personSortValues.includes(value);
};

export const PersonList: FC = () => {
  const { t } = useTranslation();
  const [initialized, setInitialized] = useState(false);
  const [data, setData] = useState<PeopleFiltered>({ items: [], total: 0 });

  const [filter, setFilter] = useState<PersonFilter>({
    sort: defaultPersonSort,
  });
  const { isPending, isError, mutateAsync } = client.useFetchPeople();

  const fetchData = useCallback(
    (filterChanges?: Partial<PersonFilter>): Promise<unknown> => {
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
    onPage: async (page, perPage) => {
      await fetchData({ page, perPage });
    },
    onPerPage: async (perPage) => {
      await fetchData({ page: 0, perPage });
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
      <PersonTable
        data={data.items}
        isLoading={isPending}
        error={isError ? t('error.fetch') : null}
        sort={filter.sort}
        sortDirection={filter.sortDirection}
        onSort={(sort, sortDirection) => {
          if (isPersonStort(sort)) {
            void fetchData({ sort, sortDirection, page: 0 });
          } else {
            Logger.error(`Could not sort people: Invalid sort "${sort}"!`);
          }
        }}
      />
      <Paging paging={paging} />
    </Box>
  );
};
