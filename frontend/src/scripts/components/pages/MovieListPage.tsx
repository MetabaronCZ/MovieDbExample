import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'components/Page';
import { MovieList } from 'components/movie/MovieList';

export const MovieListPage: FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t('page.movieList')} breadcrumbs={['moviesList']}>
      <MovieList />
    </Page>
  );
};
