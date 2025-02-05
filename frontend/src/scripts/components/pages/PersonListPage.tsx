import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'components/Page';

export const PersonListPage: FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t('page.personList')} breadcrumbs={['personList']}>
      - TODO -
    </Page>
  );
};
