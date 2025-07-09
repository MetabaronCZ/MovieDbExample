import { Movie, movieGenres } from '@project/api-types';

import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { MovieTable } from 'components/movie/MovieTable';

const movieData: Movie[] = Array(10)
  .fill(0)
  .map((_, i) => ({
    id: `${i}`,
    titleCs: `Movie title ${i} (CS)`,
    titleOriginal: `Movie title ${i} (original)`,
    year: 1980 + i,
    score: 6 + 0.1 * i,
    genres: [movieGenres[i % 7]],
    directors: [{ id: 'D1', name: 'Some director' }],
    writers: [
      { id: 'W1', name: 'Writer A' },
      { id: 'W2', name: 'Writer B' },
    ],
    stars: [
      { id: 'S1', name: 'Star A' },
      { id: 'S2', name: 'Star B' },
      { id: 'S3', name: 'Star C' },
    ],
    plot: 'Plot',
  }));

const meta: Meta<typeof MovieTable> = {
  component: MovieTable,
};

export default meta;

export const DefaultMovieTable: StoryObj<typeof MovieTable> = {
  name: 'Default movie table',
  render: () => <MovieTable data={movieData} />,
};

export const LoadingMovieTable: StoryObj<typeof MovieTable> = {
  name: 'Loading movie table',
  render: () => <MovieTable data={movieData} isLoading />,
};

export const ErrorMovieTable: StoryObj<typeof MovieTable> = {
  name: 'Error movie table',
  render: () => <MovieTable data={movieData} error="Some table data error" />,
};

export const SortedMovieTable: StoryObj<typeof MovieTable> = {
  name: 'Movie table sort',
  render: () => (
    <MovieTable
      data={movieData}
      sort="score"
      sortDirection="ascending"
      onSort={action('Sort!')}
    />
  ),
};

export const EmptyMovieTable: StoryObj<typeof MovieTable> = {
  name: 'Empty movie table',
  render: () => <MovieTable data={[]} />,
};
