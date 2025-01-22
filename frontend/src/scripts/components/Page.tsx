import React, { useEffect, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import { Layout } from './layout/Layout';
import { Heading } from './common/Heading';

interface Props extends PropsWithChildren {
  readonly title?: string;
}

export const Page: React.FC<Props> = ({ title, children }) => {
  const { t } = useTranslation();

  // set document title
  useEffect(() => {
    const appName = t('app.name');
    document.title = title ? `${title} | ${appName}` : appName;
  }, [title, t]);

  return (
    <Layout>
      {!!title && (
        <Heading tag="h2" size="large">
          {title}
        </Heading>
      )}
      {children}
    </Layout>
  );
};
