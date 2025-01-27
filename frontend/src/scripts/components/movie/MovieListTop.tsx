import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { client } from 'modules/api';
import { paths } from 'modules/paths';

import { Box } from 'components/common/Box';
import { Ico } from 'components/common/Ico';
import { Link } from 'components/common/Link';
import { Loader } from 'components/common/Loader';
import { Paragraph } from 'components/common/Paragraph';
import { MovieTable } from 'components/movie/MovieTable';

export const MovieListTop: FC = () => {
  const { t } = useTranslation();
  const [initialized, setInitialized] = useState(false);
  const { data, isPending, isError, mutateAsync } = client.useFetchMovies();

  // initial data load
  useEffect(() => {
    if (!initialized) {
      void mutateAsync(
        { perPage: 10, sort: 'score', sortDirection: 'descending' },
        {
          onSuccess: () => {
            setInitialized(true);
          },
        },
      );
    }
  }, [initialized, mutateAsync]);

  return !initialized ? (
    <Loader />
  ) : (
    <Box>
      <MovieTable
        data={data?.items ?? []}
        isLoading={isPending}
        error={isError ? t('error.fetch') : null}
      />

      <Paragraph>
        <Link to={paths.MOVIE_LIST}>{t('movies.topMore')}</Link>
        &nbsp;
        <Ico ico="angleRight" />
      </Paragraph>
    </Box>
  );
};
