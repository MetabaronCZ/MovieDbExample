import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Movie } from '@project/api-types/lib/movie';

import { paths } from 'modules/paths';

import { toVU } from 'modules/theme';
import { Link } from 'components/common/Link';
import { Table } from 'components/common/Table';
import { MovieListExpandable } from 'components/movie/MovieListExpandable';

type TableData = {
  readonly title: string[];
  readonly year: number | null;
  readonly score: number | null;
  readonly genre: string[];
  readonly director: string[];
  readonly writer: string[];
  readonly stars: string[];
  readonly detail: string;
};

interface Props {
  readonly data: Movie[];
  readonly isLoading?: boolean;
  readonly error?: string | null;
}

export const MovieTable: FC<Props> = ({ data, error, isLoading }) => {
  const { t } = useTranslation();
  return (
    <Table<TableData>
      columns={{
        title: {
          title: t('movie.title'),
          render: (value) => {
            const titles = value.filter((item) => item.length > 0);
            return <MovieListExpandable values={titles} />;
          },
        },
        year: {
          title: t('movie.year'),
          width: toVU(5),
          align: 'center',
          render: (value) => value ?? '-',
        },
        score: {
          title: t('movie.score'),
          width: toVU(6),
          align: 'center',
          render: (value) => (value ? `${value}/10` : '-'),
        },
        genre: {
          title: t('movie.genre'),
          width: toVU(20),
          render: (value) => <MovieListExpandable values={value} />,
        },
        director: {
          title: t('movie.director'),
          width: toVU(30),
          render: (value) => <MovieListExpandable values={value} />,
        },
        writer: {
          title: t('movie.writer'),
          render: (value) => <MovieListExpandable values={value} />,
        },
        stars: {
          title: t('movie.stars'),
          render: (value) => <MovieListExpandable values={value} />,
        },
        detail: {
          width: toVU(6),
          align: 'right',
          render: (id) => (
            <Link to={paths.MOVIE_DETAIL(id)}>{t('movie.detail')}</Link>
          ),
        },
      }}
      isLoading={isLoading}
      error={error}
      data={data.map((item) => ({
        title: [item.titleCs, item.titleOriginal],
        year: item.year,
        score: item.score,
        genre: item.genres,
        director: item.directors,
        writer: item.writers,
        stars: item.stars,
        detail: item.id,
      }))}
    />
  );
};
