import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { client } from 'modules/api';

import { Page } from 'components/Page';
import { Infobox } from 'components/common/Infobox';
import { PersonDetail } from 'components/person/PersonDetail';
import { FetchContainer } from 'components/common/FetchContainer';

type Params = {
  readonly id: string;
};

export const PersonDetailPage: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<Params>();
  const { data, isLoading, isError } = client.useFetchPerson(id ?? '');

  return (
    <Page title={data?.name} breadcrumbs={['personList', 'personDetail']}>
      <FetchContainer isLoading={isLoading} isError={isError}>
        {!data ? (
          <Infobox type="error">{t('person.notFound')}</Infobox>
        ) : (
          <PersonDetail data={data} />
        )}
      </FetchContainer>
    </Page>
  );
};
