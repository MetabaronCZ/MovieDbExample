import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { TFunction } from 'i18next';

import { MovieGenre, movieGenres, MoviePersonData } from '@project/api-types';

import { toVU } from 'modules/theme';

import { Grid } from 'components/common/Grid';
import { SelectField } from 'components/forms/SelectField';
import { MovieRoleSelect } from 'components/movie/MovieRoleSelect';
import { SelectOption } from 'components/forms/select/SelectShared';

const getGenreOptions = (t: TFunction): SelectOption<MovieGenre>[] => {
  return movieGenres.map((genre) => ({
    title: t(`genre.${genre}`),
    value: genre,
  }));
};

const Container = styled(Grid)`
  padding: ${toVU(1)} 0;
`;

interface Props {
  readonly directors: MoviePersonData[];
  readonly writers: MoviePersonData[];
  readonly stars: MoviePersonData[];
  readonly genres: MovieGenre[];
  readonly isLoading?: boolean;
  readonly onDirector: (value: MoviePersonData[]) => void;
  readonly onWriter: (value: MoviePersonData[]) => void;
  readonly onStar: (value: MoviePersonData[]) => void;
  readonly onGenre: (value: MovieGenre[]) => void;
}

export const MovieListFilterAdvanced: FC<Props> = ({
  directors,
  writers,
  stars,
  genres,
  isLoading = false,
  onDirector,
  onWriter,
  onStar,
  onGenre,
}) => {
  const { t } = useTranslation();
  const genreOptions = useMemo(() => getGenreOptions(t), [t]);
  return (
    <Container orientation="vertical" gap={1}>
      <SelectField
        label={t('movie.genre')}
        orientation="compact"
        value={genres}
        options={genreOptions}
        disabled={isLoading}
        multi
        onSelect={(value) => {
          onGenre(value);
        }}
      />
      <MovieRoleSelect
        title={t('movie.director')}
        role="director"
        value={directors}
        disabled={isLoading}
        onSelect={onDirector}
      />
      <MovieRoleSelect
        title={t('movie.writer')}
        role="writer"
        value={writers}
        disabled={isLoading}
        onSelect={onWriter}
      />
      <MovieRoleSelect
        title={t('movie.star')}
        role="star"
        value={stars}
        disabled={isLoading}
        onSelect={onStar}
      />
    </Container>
  );
};
