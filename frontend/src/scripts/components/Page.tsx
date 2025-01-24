import { FC, useEffect, PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

import { Layout } from './layout/Layout';
import { Heading } from './common/Heading';
import { ErrorPage } from 'components/pages/ErrorPage';

interface Props extends PropsWithChildren {
  readonly title?: string;
}

export const Page: FC<Props> = ({ title, children }) => {
  const { t } = useTranslation();

  // set document title
  useEffect(() => {
    const appName = t('app.name');
    document.title = title ? `${title} | ${appName}` : appName;
  }, [title, t]);

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Layout>
        {!!title && (
          <Heading tag="h2" size="large">
            {title}
          </Heading>
        )}
        {children}
      </Layout>
    </ErrorBoundary>
  );
};
