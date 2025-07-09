import { Movie } from '@project/api-types';
import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { MovieForm } from 'components/movie/MovieForm';

const movieData: Movie = {
  id: '1',
  titleCs: 'Movie title CS',
  titleOriginal: 'Movie title original',
  year: 1999,
  score: 6.5,
  genres: ['Action', 'Drama', 'Thriller'],
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
  plot: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nulla debitis, quisquam corrupti perspiciatis ipsa sed labore, odit totam, ipsum nostrum quos. Sit fugiat esse consequatur delectus! Cupiditate, fugiat ex.',
};

const meta: Meta<typeof MovieForm> = {
  component: MovieForm,
};

export default meta;

export const DefaultMovieForm: StoryObj<typeof MovieForm> = {
  name: 'Default movie form',
  render: () => <MovieForm data={movieData} onEdit={action('Edit!')} />,
};

export const LoadingMovieForm: StoryObj<typeof MovieForm> = {
  name: 'Loading movie form',
  render: () => (
    <MovieForm data={movieData} isLoading onEdit={action('Edit!')} />
  ),
};

export const ErrorMovieForm: StoryObj<typeof MovieForm> = {
  name: 'Error movie form',
  render: () => (
    <MovieForm
      data={movieData}
      error="Some form submit error"
      onEdit={action('Edit!')}
    />
  ),
};
