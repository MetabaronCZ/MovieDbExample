import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { client } from 'modules/api';

import { Page } from 'components/Page';
import { Box } from 'components/common/Box';
import { Infobox } from 'components/common/Infobox';
import { Paragraph } from 'components/common/Paragraph';
import { FetchContainer } from 'components/common/FetchContainer';

type Params = {
  readonly id: string;
};

export const MovieDetailPage: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<Params>();
  const { data, isLoading, isError } = client.useFetchMovie(id ?? '');
  const title = data?.titleCs || data?.titleOriginal;

  return (
    <Page title={title}>
      <FetchContainer isLoading={isLoading} isError={isError}>
        {!data ? (
          <Infobox type="error">{t('movie.notFound')}</Infobox>
        ) : (
          <Box>
            <pre style={{ whiteSpace: 'break-spaces' }}>
              <Paragraph>{JSON.stringify(data, null, 4)}</Paragraph>
            </pre>
          </Box>
        )}
      </FetchContainer>
    </Page>
  );
};
