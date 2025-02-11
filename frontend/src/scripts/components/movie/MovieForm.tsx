import { FC, useMemo } from 'react';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import {
  Movie,
  MovieGenre,
  movieGenres,
  MoviePersonData,
} from '@project/api-types';

import { client } from 'modules/api';
import { paths } from 'modules/paths';
import { useForm } from 'hooks/useForm';
import { getValidations } from 'modules/validations';

import { Box } from 'components/common/Box';
import { Grid } from 'components/common/Grid';
import { Form } from 'components/forms/Form';
import { Button } from 'components/buttons/Button';
import { Infobox } from 'components/common/Infobox';
import { TextField } from 'components/forms/TextField';
import { SelectField } from 'components/forms/SelectField';
import { ButtonLink } from 'components/buttons/ButtonLink';
import { TextareaField } from 'components/forms/TextareaField';
import { SelectOption } from 'components/forms/select/SelectShared';
import { MovieRoleSelect } from 'components/movie/MovieRoleSelect';

// movie year values for select options
const years = Array(100)
  .fill(0)
  .map((_, i) => ({ title: `${1900 + i}`, value: `${1900 + i}` }));

const getYearOptions = (t: TFunction): SelectOption<string>[] => [
  { title: t('select'), value: '' },
  ...years,
];

const getGenreOptions = (t: TFunction): SelectOption<MovieGenre>[] => {
  return movieGenres.map((genre) => ({
    title: t(`genre.${genre}`),
    value: genre,
  }));
};

type FormData = {
  readonly titleCs: string;
  readonly titleOriginal: string;
  readonly year: string;
  readonly score: string;
  readonly genres: MovieGenre[];
  readonly directors: MoviePersonData[];
  readonly writers: MoviePersonData[];
  readonly stars: MoviePersonData[];
  readonly plot: string;
};

interface Props {
  readonly data: Movie;
}

export const MovieForm: FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const { isPending, isError, mutate: editMovie } = client.useEditMovie();

  const validations = useMemo(() => getValidations(t), [t]);
  const yearOptions = useMemo(() => getYearOptions(t), [t]);
  const genreOptions = useMemo(() => getGenreOptions(t), [t]);

  const { values, errors, setValue, submit } = useForm<FormData>({
    initialValues: {
      titleCs: data.titleCs,
      titleOriginal: data.titleOriginal,
      year: `${data.year ?? ''}`,
      score: `${data.score ?? ''}`,
      genres: data.genres,
      directors: data.directors,
      writers: data.writers,
      stars: data.stars,
      plot: data.plot,
    },
    validations: {
      score: [validations.MIN(0), validations.MAX(10)],
    },
    onSubmit: (formData) => {
      const year = formData.year.trim();
      const score = formData.score.trim();

      // send form data
      editMovie({
        id: data.id,
        data: {
          titleCs: formData.titleCs.trim(),
          titleOriginal: formData.titleOriginal.trim(),
          year: year ? parseInt(year, 10) : null,
          score: score ? parseFloat(score) : null,
          genres: formData.genres,
          directors: formData.directors.map((item) => item.id),
          writers: formData.writers.map((item) => item.id),
          stars: formData.stars.map((item) => item.id),
          plot: formData.plot.trim(),
        },
      });
    },
  });

  return (
    <Form loading={isPending} onSubmit={submit}>
      {isError && <Infobox type="error">{t('error.submit')}</Infobox>}

      <Box>
        <Grid orientation="vertical" gap={1}>
          <TextField
            label={t('movie.titleCs')}
            value={values.titleCs}
            error={errors.titleCs}
            disabled={isPending}
            onChange={(value) => {
              setValue('titleCs', value);
            }}
          />
          <TextField
            label={t('movie.titleOriginal')}
            value={values.titleOriginal}
            error={errors.titleOriginal}
            disabled={isPending}
            onChange={(value) => {
              setValue('titleOriginal', value);
            }}
          />
          <SelectField
            label={t('movie.year')}
            value={values.year}
            error={errors.year}
            options={yearOptions}
            disabled={isPending}
            vertical
            onSelect={(value) => {
              setValue('year', value);
            }}
          />
          <TextField
            label={t('movie.score')}
            type="number"
            value={values.score}
            error={errors.score}
            min={0}
            max={10}
            step={0.1}
            disabled={isPending}
            onChange={(value) => {
              setValue('score', value);
            }}
          />
          <SelectField
            label={t('movie.genre')}
            value={values.genres}
            error={errors.genres}
            options={genreOptions}
            disabled={isPending}
            multi
            vertical
            onSelect={(value) => {
              setValue('genres', value);
            }}
          />
          <MovieRoleSelect
            title={t('movie.director')}
            role="director"
            value={values.directors}
            error={errors.directors}
            disabled={isPending}
            onSelect={(value) => {
              setValue('directors', value);
            }}
          />
          <MovieRoleSelect
            title={t('movie.writer')}
            role="writer"
            value={values.writers}
            error={errors.writers}
            disabled={isPending}
            onSelect={(value) => {
              setValue('writers', value);
            }}
          />
          <MovieRoleSelect
            title={t('movie.star')}
            role="star"
            value={values.stars}
            error={errors.stars}
            disabled={isPending}
            onSelect={(value) => {
              setValue('stars', value);
            }}
          />
          <TextareaField
            label={t('movie.plot')}
            value={values.plot}
            error={errors.plot}
            disabled={isPending}
            onChange={(value) => {
              setValue('plot', value);
            }}
          />
        </Grid>
      </Box>

      <Grid justify="space-between">
        <ButtonLink
          icoBefore="angleLeft"
          to={paths.MOVIE_DETAIL(data.id)}
          text={t('back')}
        />
        <Button
          ico={isPending ? 'spinner' : null}
          icoSpin={isPending}
          text={t('submit')}
          disabled={isPending}
          onClick={submit}
        />
      </Grid>
    </Form>
  );
};
