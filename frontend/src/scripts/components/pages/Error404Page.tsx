import React from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from 'components/Page';
import { Infobox } from 'components/common/Infobox';

export const Error404Page: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Page title={t('page.error404')}>
      <Infobox type="error">{t('error.notFound')}</Infobox>
    </Page>
  );
};
