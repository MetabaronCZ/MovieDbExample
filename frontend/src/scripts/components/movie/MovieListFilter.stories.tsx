import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { MovieListFilter } from 'components/movie/MovieListFilter';

const meta: Meta<typeof MovieListFilter> = {
  component: MovieListFilter,
};

export default meta;

export const DefaultMovieListFilter: StoryObj<typeof MovieListFilter> = {
  name: 'Default movie filter',
  render: () => <MovieListFilter onChange={action('Change!')} />,
};

export const LoadingMovieListFilter: StoryObj<typeof MovieListFilter> = {
  name: 'Loading movie filter',
  render: () => <MovieListFilter isLoading onChange={action('Change!')} />,
};
