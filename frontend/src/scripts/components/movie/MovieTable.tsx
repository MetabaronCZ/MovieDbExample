import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Movie,
  MovieGenre,
  MoviePersonData,
  SortDirection,
} from '@project/api-types';

import { paths } from 'modules/paths';
import { formatScore } from 'modules/movie';

import { toVU } from 'modules/theme';
import { Ico } from 'components/common/Ico';
import { Grid } from 'components/common/Grid';
import { Link } from 'components/common/Link';
import { Table } from 'components/common/Table';
import { ExpandableList } from 'components/common/ExpandableList';

interface TitleTableData {
  readonly id: string;
  readonly titleCs: string;
  readonly titleOriginal: string;
}

type TableData = {
  readonly title: TitleTableData;
  readonly year: number | null;
  readonly score: number | null;
  readonly genre: MovieGenre[];
  readonly director: MoviePersonData[];
  readonly writer: MoviePersonData[];
  readonly star: MoviePersonData[];
  readonly detail: string;
};

interface Props {
  readonly data: Movie[];
  readonly isLoading?: boolean;
  readonly error?: string | null;
  readonly sort?: keyof TableData;
  readonly sortDirection?: SortDirection;
  readonly onSort?: (column: keyof TableData, direction: SortDirection) => void;
}

export const MovieTable: FC<Props> = ({
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
        title: {
          title: t('movie.title'),
          sort: true,
          render: ({ id, titleCs, titleOriginal }) => {
            const titles = [titleCs, titleOriginal]
              .filter((item) => item.length > 0)
              .map((item) => ({ title: item, url: paths.MOVIE_DETAIL(id) }));
            return <ExpandableList values={titles} />;
          },
        },
        year: {
          title: t('movie.year'),
          width: toVU(7),
          align: 'center',
          sort: true,
          render: (value) => value ?? '-',
        },
        score: {
          title: t('movie.score'),
          width: toVU(8),
          align: 'center',
          sort: true,
          render: formatScore,
        },
        genre: {
          title: t('movie.genre'),
          width: toVU(20),
          render: (value) => {
            const items = value.map((item) => ({ title: t(`genre.${item}`) }));
            return <ExpandableList values={items} />;
          },
        },
        director: {
          title: t('movie.director'),
          width: toVU(30),
          render: (value) => {
            const items = value.map((item) => ({
              title: item.name,
              url: paths.PERSON_DETAIL(item.id),
            }));
            return <ExpandableList values={items} />;
          },
        },
        writer: {
          title: t('movie.writer'),
          render: (value) => {
            const items = value.map((item) => ({
              title: item.name,
              url: paths.PERSON_DETAIL(item.id),
            }));
            return <ExpandableList values={items} />;
          },
        },
        star: {
          title: t('movie.star'),
          render: (value) => {
            const items = value.map((item) => ({
              title: item.name,
              url: paths.PERSON_DETAIL(item.id),
            }));
            return <ExpandableList values={items} />;
          },
        },
        detail: {
          width: toVU(6),
          align: 'right',
          render: (id) => (
            <Grid align="center" gap={1}>
              <Link to={paths.MOVIE_DETAIL(id)}>{t('movie.detail')}</Link>
              <Ico ico="angleRight" />
            </Grid>
          ),
        },
      }}
      isLoading={isLoading}
      error={error}
      data={data.map((item) => ({
        title: {
          id: item.id,
          titleCs: item.titleCs,
          titleOriginal: item.titleOriginal,
        },
        year: item.year,
        score: item.score,
        genre: item.genres,
        director: item.directors,
        writer: item.writers,
        star: item.stars,
        detail: item.id,
      }))}
      sort={sort}
      sortDirection={sortDirection}
      onSort={onSort}
    />
  );
};
