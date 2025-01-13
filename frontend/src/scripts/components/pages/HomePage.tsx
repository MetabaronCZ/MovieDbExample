import React from 'react';
import { useTranslation } from 'react-i18next';

import { client } from 'modules/api';

import { Page } from 'components/Page';
import { Loader } from 'components/common/Loader';
import { Paragraph } from 'components/common/Paragraph';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError } = client.useTestQuery();
  return (
    <Page title={t('page.home')}>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Paragraph>{t('error.fetch')}</Paragraph>
      ) : (
        <Paragraph>
          ({data}) - Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Earum dolorum sint nisi cupiditate dolores hic quibusdam veniam.
          Laborum, sunt, nam sequi laudantium iure quaerat repudiandae
          aspernatur consectetur dolor eius natus.
        </Paragraph>
      )}
    </Page>
  );
};
