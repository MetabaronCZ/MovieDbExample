import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'components/Page';
import { Heading } from 'components/common/Heading';
import { MovieListTop } from 'components/movie/MovieListTop';

export const HomePage: FC = () => {
  const { t } = useTranslation();
  return (
    <Page>
      <Heading tag="h2" size="large">
        {t('movies.top')}
      </Heading>

      <MovieListTop />
    </Page>
  );
};
