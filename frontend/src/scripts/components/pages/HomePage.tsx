import React from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'components/Page';
import { MovieTable } from 'components/movie/MovieTable';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t('page.home')}>
      <MovieTable />
    </Page>
  );
};
