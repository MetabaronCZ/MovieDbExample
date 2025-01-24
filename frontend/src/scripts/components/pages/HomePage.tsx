import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'components/Page';
import { MovieList } from 'components/movie/MovieList';

export const HomePage: FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t('page.home')}>
      <MovieList />
    </Page>
  );
};
