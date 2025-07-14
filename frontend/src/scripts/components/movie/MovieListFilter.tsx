import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { MovieFilter, MovieGenre, MoviePersonData } from '@project/api-types';

import { useForm } from 'hooks/useForm';
import {
  minYear,
  maxYear,
  minScore,
  maxScore,
  movieScores,
  movieYears,
} from 'modules/movie';

import { Box } from 'components/common/Box';
import { Ico } from 'components/common/Ico';
import { Form } from 'components/forms/Form';
import { Grid } from 'components/common/Grid';
import { Button } from 'components/buttons/Button';
import { TextField } from 'components/forms/TextField';
import { Paragraph } from 'components/common/Paragraph';
import { LinkButton } from 'components/common/LinkButton';
import { SelectRange } from 'components/forms/SelectRange';
import { MovieListFilterAdvanced } from 'components/movie/MovieListFilterAdvanced';

const formDataToFilter = (formData: FormData): MovieFilter => ({
  query: formData.query,
  yearFrom: formData.yearFrom,
  yearTo: formData.yearTo,
  scoreFrom: formData.scoreFrom,
  scoreTo: formData.scoreTo,
  directors: formData.directors.map((item) => item.id),
  writers: formData.writers.map((item) => item.id),
  stars: formData.stars.map((item) => item.id),
  genres: formData.genres,
});

const FilterQuery = styled.div`
  flex: 1;
`;

const AdvancedFilterButton = styled(Paragraph)`
  flex: 1;
  text-align: right;
`;

type FormData = {
  readonly query: string;
  readonly yearFrom: number;
  readonly yearTo: number;
  readonly scoreFrom: number;
  readonly scoreTo: number;
  readonly genres: MovieGenre[];
  readonly directors: MoviePersonData[];
  readonly writers: MoviePersonData[];
  readonly stars: MoviePersonData[];
};

interface Props {
  readonly isLoading?: boolean;
  readonly onChange: (filter: MovieFilter) => void;
}

export const MovieListFilter: FC<Props> = ({ isLoading = false, onChange }) => {
  const { t } = useTranslation();

  const { values, errors, setValue, submit, clear } = useForm<FormData>({
    initialValues: {
      query: '',
      yearFrom: minYear,
      yearTo: maxYear,
      scoreFrom: minScore,
      scoreTo: maxScore,
      directors: [],
      writers: [],
      stars: [],
      genres: [],
    },
    validations: {
      /* */
    },
    onSubmit: (formData) => {
      const data = formDataToFilter(formData);
      onChange(data);
    },
    onClear: (formData) => {
      const data = formDataToFilter(formData);
      onChange(data);
    },
  });

  const hasAdvancedChanges =
    values.directors.length > 0 ||
    values.writers.length > 0 ||
    values.stars.length > 0 ||
    values.genres.length > 0;

  const [advanced, setAdvanced] = useState(hasAdvancedChanges);

  return (
    <Form loading={isLoading} onSubmit={submit}>
      <Box>
        <Grid orientation="vertical" gap={1}>
          <Grid align="center" gap={1}>
            <Grid align="center" flex={1}>
              <FilterQuery>
                <TextField
                  placeholder={t('filter.movie.query')}
                  value={values.query}
                  error={errors.query}
                  disabled={isLoading}
                  onChange={(value) => {
                    setValue('query', value);
                  }}
                />
              </FilterQuery>

              <SelectRange
                label={`${t('movie.year')}:`}
                from={values.yearFrom}
                to={values.yearTo}
                values={movieYears}
                disabled={isLoading}
                onFrom={(value) => {
                  setValue('yearFrom', value);
                }}
                onTo={(value) => {
                  setValue('yearTo', value);
                }}
              />

              <SelectRange
                label={`${t('movie.score')}:`}
                from={values.scoreFrom}
                to={values.scoreTo}
                values={movieScores}
                disabled={isLoading}
                formatValue={(value) => value.toFixed(1)}
                onFrom={(value) => {
                  setValue('scoreFrom', value);
                }}
                onTo={(value) => {
                  setValue('scoreTo', value);
                }}
              />
            </Grid>
          </Grid>

          {advanced && (
            <MovieListFilterAdvanced
              isLoading={isLoading}
              directors={values.directors}
              writers={values.writers}
              stars={values.stars}
              genres={values.genres}
              onDirector={(value) => {
                setValue('directors', value);
              }}
              onWriter={(value) => {
                setValue('writers', value);
              }}
              onStar={(value) => {
                setValue('stars', value);
              }}
              onGenre={(value) => {
                setValue('genres', value);
              }}
            />
          )}

          <Grid align="center" gap={1}>
            <Button
              text={t('filter.action')}
              icoBefore={isLoading ? 'spinner' : 'search'}
              icoSpin={isLoading}
              disabled={isLoading}
              onClick={submit}
            />

            <Button
              text={t('filter.clear')}
              icoBefore="filterClear"
              disabled={isLoading}
              onClick={clear}
            />

            <AdvancedFilterButton>
              <LinkButton
                onClick={() => {
                  // toggle advanced filter visibility
                  setAdvanced(!advanced);
                }}
              >
                {advanced ? t('filter.hideAdvanced') : t('filter.showAdvanced')}
              </LinkButton>
              {!advanced && hasAdvancedChanges && (
                <i>&nbsp;({t('filter.advancedChanges')})</i>
              )}
              &nbsp;
              <Ico ico={advanced ? 'angleUp' : 'angleDown'} />
            </AdvancedFilterButton>
          </Grid>
        </Grid>
      </Box>
    </Form>
  );
};
