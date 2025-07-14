import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'components/Page';
import { PersonList } from 'components/person/PersonList';

export const PersonListPage: FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t('page.personList')} breadcrumbs={['personList']}>
      <PersonList showFilter />
    </Page>
  );
};
