import { FC, useEffect, PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

import { BreadcrumbsItemId } from 'modules/breadcrumbs';

import { Layout } from './layout/Layout';
import { Heading } from './common/Heading';
import { Grid } from 'components/common/Grid';
import { ErrorPage } from 'components/pages/ErrorPage';
import { Breadcrumbs } from 'components/common/Breadcrumbs';

interface Props extends PropsWithChildren {
  readonly title?: string;
  readonly breadcrumbs?: BreadcrumbsItemId[];
}

export const Page: FC<Props> = ({ title, breadcrumbs, children }) => {
  const { t } = useTranslation();

  // set document title
  useEffect(() => {
    const appName = t('app.name');
    document.title = title ? `${title} | ${appName}` : appName;
  }, [title, t]);

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Layout>
        <Grid orientation="vertical" gap={1}>
          <Breadcrumbs items={breadcrumbs} />

          {!!title && (
            <Heading tag="h2" size="large">
              {title}
            </Heading>
          )}
        </Grid>

        {children}
      </Layout>
    </ErrorBoundary>
  );
};
