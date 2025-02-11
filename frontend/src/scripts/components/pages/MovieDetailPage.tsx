import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { client } from 'modules/api';
import { getMovieTitle } from 'modules/movie';

import { Page } from 'components/Page';
import { Infobox } from 'components/common/Infobox';
import { MovieDetail } from 'components/movie/MovieDetail';
import { FetchContainer } from 'components/common/FetchContainer';

type Params = {
  readonly id: string;
};

export const MovieDetailPage: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<Params>();
  const { data, isLoading, isRefetching, isError } = client.useFetchMovie(
    id ?? '',
  );

  const movieTitle = useMemo(() => {
    return data ? getMovieTitle(data) : '';
  }, [data]);

  return (
    <Page title={movieTitle} breadcrumbs={['movieList', 'movieDetail']}>
      <FetchContainer isLoading={isLoading} isError={isError}>
        {!data ? (
          <Infobox type="error">{t('movie.notFound')}</Infobox>
        ) : (
          <MovieDetail data={data} loading={isRefetching} />
        )}
      </FetchContainer>
    </Page>
  );
};
