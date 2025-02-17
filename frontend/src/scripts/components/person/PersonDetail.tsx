import { FC } from 'react';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import { Person } from '@project/api-types';

import { formatMovieCount } from 'modules/movie';

import { Grid } from 'components/common/Grid';
import { Heading } from 'components/common/Heading';
import { Infobox } from 'components/common/Infobox';
import { MovieList } from 'components/movie/MovieList';

const formatTableHeading = (
  t: TFunction,
  title: string,
  count: number,
): string => {
  if (0 === count) {
    return title;
  }
  return `${title} (${formatMovieCount(t, count)})`;
};

interface Props {
  readonly data: Person;
}

export const PersonDetail: FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const directorCount = data.director.length;
  const writerCount = data.writer.length;
  const starCount = data.star.length;
  return (
    <Grid orientation="vertical">
      <Grid orientation="vertical" gap={1}>
        <Heading tag="h3">
          {formatTableHeading(t, t('person.director'), directorCount)}
        </Heading>

        {directorCount > 0 ? (
          <MovieList filter={{ directors: [data.id] }} />
        ) : (
          <Infobox>{t('person.noDirector')}</Infobox>
        )}
      </Grid>

      <Grid orientation="vertical" gap={1}>
        <Heading tag="h3">
          {formatTableHeading(t, t('person.writer'), writerCount)}
        </Heading>

        {writerCount > 0 ? (
          <MovieList filter={{ writers: [data.id] }} />
        ) : (
          <Infobox>{t('person.noWriter')}</Infobox>
        )}
      </Grid>

      <Grid orientation="vertical" gap={1}>
        <Heading tag="h3">
          {formatTableHeading(t, t('person.star'), starCount)}
        </Heading>

        {starCount > 0 ? (
          <MovieList filter={{ stars: [data.id] }} />
        ) : (
          <Infobox>{t('person.noStar')}</Infobox>
        )}
      </Grid>
    </Grid>
  );
};
