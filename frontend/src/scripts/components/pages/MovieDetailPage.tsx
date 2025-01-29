import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

import { Movie } from '@project/api-types';

import { client } from 'modules/api';
import { formatScore } from 'modules/movie';

import { Page } from 'components/Page';
import { Box } from 'components/common/Box';
import { Grid } from 'components/common/Grid';
import { Infobox } from 'components/common/Infobox';
import { Paragraph } from 'components/common/Paragraph';
import { FetchContainer } from 'components/common/FetchContainer';

const formatArray = (array: string[]): string => {
  return array.join(', ') || '-';
};

interface MovieDataItem {
  readonly title: string;
  readonly value: string;
}

const getMovieData = (t: TFunction, movie: Movie): MovieDataItem[] => [
  { title: t('movie.titleCs'), value: movie.titleCs || '-' },
  { title: t('movie.titleOriginal'), value: movie.titleOriginal || '-' },
  { title: t('movie.year'), value: `${movie.year ?? '-'}` },
  { title: t('movie.score'), value: formatScore(movie.score) },
  { title: t('movie.genre'), value: formatArray(movie.genres) },
  { title: t('movie.director'), value: formatArray(movie.directors) },
  { title: t('movie.writer'), value: formatArray(movie.writers) },
  { title: t('movie.stars'), value: formatArray(movie.stars) },
];

type Params = {
  readonly id: string;
};

export const MovieDetailPage: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<Params>();
  const { data, isLoading, isError } = client.useFetchMovie(id ?? '');

  const [movieTitle, movieData] = useMemo(() => {
    if (!data) {
      return ['', []];
    }
    const dataItems = getMovieData(t, data);
    let title = data.titleCs || data.titleOriginal;

    if (!!title && data.year) {
      title = `${title} (${data.year})`;
    }
    return [title, dataItems];
  }, [t, data]);

  return (
    <Page title={movieTitle} breadcrumbs={['moviesList', 'moviesDetail']}>
      <FetchContainer isLoading={isLoading} isError={isError}>
        {!data ? (
          <Infobox type="error">{t('movie.notFound')}</Infobox>
        ) : (
          <Grid>
            <Box>
              <Grid orientation="vertical" gap={1}>
                {movieData.map((item, i) => (
                  <Paragraph key={i}>
                    <strong>{item.title}:</strong> {item.value}
                  </Paragraph>
                ))}
              </Grid>
            </Box>

            <Box>
              <Paragraph>
                <strong>{t('movie.plot')}:</strong>
                <br />
                {data.plot || <em>{t('movie.noPlot')}</em>}
              </Paragraph>
            </Box>
          </Grid>
        )}
      </FetchContainer>
    </Page>
  );
};
