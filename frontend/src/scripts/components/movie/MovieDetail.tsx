import { FC, Fragment, ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

import { Movie, MoviePersonData } from '@project/api-types';

import { paths } from 'modules/paths';
import { formatScore } from 'modules/movie';

import { Box } from 'components/common/Box';
import { Grid } from 'components/common/Grid';
import { Link } from 'components/common/Link';
import { Paragraph } from 'components/common/Paragraph';
import { ButtonLink } from 'components/buttons/ButtonLink';
import { UpdatedContent } from 'components/common/UpdatedContent';

const formatArray = (array: string[]): string => {
  return array.join(', ') || '-';
};

const renderPersonList = (people: MoviePersonData[]): ReactNode => {
  if (0 === people.length) {
    return '-';
  }
  return people.map((person, i) => (
    <Fragment key={person.id}>
      <Link to={paths.PERSON_DETAIL(person.id)}>{person.name}</Link>
      {i < people.length - 1 && <>,&nbsp;</>}
    </Fragment>
  ));
};

interface MovieDataItem {
  readonly title: string;
  readonly value: ReactNode;
}

const getMovieData = (t: TFunction, movie: Movie): MovieDataItem[] => [
  { title: t('movie.titleCs'), value: movie.titleCs || '-' },
  { title: t('movie.titleOriginal'), value: movie.titleOriginal || '-' },
  { title: t('movie.year'), value: `${movie.year ?? '-'}` },
  { title: t('movie.score'), value: formatScore(movie.score) },
  {
    title: t('movie.genre'),
    value: formatArray(movie.genres.map((item) => t(`genre.${item}`))),
  },
  { title: t('movie.director'), value: renderPersonList(movie.directors) },
  { title: t('movie.writer'), value: renderPersonList(movie.writers) },
  { title: t('movie.star'), value: renderPersonList(movie.stars) },
];

interface Props {
  readonly data: Movie;
  readonly loading?: boolean;
}

export const MovieDetail: FC<Props> = ({ data, loading = false }) => {
  const { t } = useTranslation();

  const movieData = useMemo(() => {
    return getMovieData(t, data);
  }, [t, data]);

  return (
    <UpdatedContent loading={loading}>
      <Grid orientation="vertical">
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

        <div>
          <ButtonLink
            icoBefore="edit"
            to={paths.MOVIE_EDIT(data.id)}
            text={t('edit')}
          />
        </div>
      </Grid>
    </UpdatedContent>
  );
};
