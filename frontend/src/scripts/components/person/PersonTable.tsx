import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Person, SortDirection } from '@project/api-types';

import { toVU } from 'modules/theme';
import { paths } from 'modules/paths';
import { formatMovieCount } from 'modules/movie';

import { Ico } from 'components/common/Ico';
import { Grid } from 'components/common/Grid';
import { Link } from 'components/common/Link';
import { Table } from 'components/common/Table';

interface NameTableData {
  readonly id: string;
  readonly name: string;
}

type TableData = {
  readonly name: NameTableData;
  readonly director: number; // movie count
  readonly writer: number; // movie count
  readonly star: number; // movie count
  readonly detail: string;
};

interface Props {
  readonly data: Person[];
  readonly isLoading?: boolean;
  readonly error?: string | null;
  readonly sort?: keyof TableData;
  readonly sortDirection?: SortDirection;
  readonly onSort?: (column: keyof TableData, direction: SortDirection) => void;
}

export const PersonTable: FC<Props> = ({
  data,
  error,
  isLoading,
  sort,
  sortDirection,
  onSort,
}) => {
  const { t } = useTranslation();
  return (
    <Table<TableData>
      columns={{
        name: {
          title: t('person.name'),
          width: 2,
          sort: true,
          render: ({ id, name }) => {
            return <Link to={paths.PERSON_DETAIL(id)}>{name}</Link>;
          },
        },
        director: {
          title: t('person.director'),
          sort: true,
          render: (value) => formatMovieCount(t, value),
        },
        writer: {
          title: t('person.writer'),
          sort: true,
          render: (value) => formatMovieCount(t, value),
        },
        star: {
          title: t('person.star'),
          sort: true,
          render: (value) => formatMovieCount(t, value),
        },
        detail: {
          width: toVU(6),
          align: 'right',
          render: (id) => (
            <Grid align="center" gap={1}>
              <Link to={paths.PERSON_DETAIL(id)}>{t('person.detail')}</Link>
              <Ico ico="angleRight" />
            </Grid>
          ),
        },
      }}
      isLoading={isLoading}
      error={error}
      data={data.map((item) => ({
        name: {
          id: item.id,
          name: item.name,
        },
        director: item.director.length,
        writer: item.writer.length,
        star: item.star.length,
        detail: item.id,
      }))}
      sort={sort}
      sortDirection={sortDirection}
      onSort={onSort}
    />
  );
};
