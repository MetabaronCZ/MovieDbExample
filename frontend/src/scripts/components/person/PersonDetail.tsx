import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Person } from '@project/api-types';

import { Grid } from 'components/common/Grid';
import { Heading } from 'components/common/Heading';
import { Infobox } from 'components/common/Infobox';
import { MovieList } from 'components/movie/MovieList';

interface Props {
  readonly data: Person;
}

export const PersonDetail: FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <Grid orientation="vertical">
      <Grid orientation="vertical" gap={1}>
        <Heading tag="h3">{t('person.director')}</Heading>

        {data.director.length > 0 ? (
          <MovieList filter={{ directors: [data.id] }} />
        ) : (
          <Infobox>{t('person.noDirector')}</Infobox>
        )}
      </Grid>

      <Grid orientation="vertical" gap={1}>
        <Heading tag="h3">{t('person.writer')}</Heading>

        {data.writer.length > 0 ? (
          <MovieList filter={{ writers: [data.id] }} />
        ) : (
          <Infobox>{t('person.noWriter')}</Infobox>
        )}
      </Grid>

      <Grid orientation="vertical" gap={1}>
        <Heading tag="h3">{t('person.star')}</Heading>

        {data.star.length > 0 ? (
          <MovieList filter={{ stars: [data.id] }} />
        ) : (
          <Infobox>{t('person.noStar')}</Infobox>
        )}
      </Grid>
    </Grid>
  );
};
