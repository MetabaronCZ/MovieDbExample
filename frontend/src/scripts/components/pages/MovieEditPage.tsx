import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { client } from 'modules/api';
import { getMovieTitle } from 'modules/movie';

import { Page } from 'components/Page';
import { Infobox } from 'components/common/Infobox';
import { MovieForm } from 'components/movie/MovieForm';
import { FetchContainer } from 'components/common/FetchContainer';

type Params = {
  readonly id: string;
};

export const MovieEditPage: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<Params>();
  const { data, isLoading, isError } = client.useFetchMovie(id ?? '');
  const movieTitle = useMemo(() => (data ? getMovieTitle(data) : ''), [data]);

  return (
    <Page title={movieTitle} breadcrumbs={['movieList', 'movieEdit']}>
      <FetchContainer isLoading={isLoading} isError={isError}>
        {!data ? (
          <Infobox type="error">{t('movie.notFound')}</Infobox>
        ) : (
          <MovieForm data={data} />
        )}
      </FetchContainer>
    </Page>
  );
};
