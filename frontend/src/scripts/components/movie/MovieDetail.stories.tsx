import { Movie } from '@project/api-types';
import type { Meta, StoryObj } from '@storybook/react';

import { MovieDetail } from './MovieDetail';

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

const emptyMovieData: Movie = {
  id: '1',
  titleCs: '',
  titleOriginal: '',
  year: null,
  score: null,
  genres: [],
  directors: [],
  writers: [],
  stars: [],
  plot: '',
};

const meta: Meta<typeof MovieDetail> = {
  component: MovieDetail,
};

export default meta;

export const DefaultMovieDetail: StoryObj<typeof MovieDetail> = {
  name: 'Default movie detail',
  render: () => <MovieDetail data={movieData} />,
};

export const LoadingMovieDetail: StoryObj<typeof MovieDetail> = {
  name: 'Loading movie detail',
  render: () => <MovieDetail data={movieData} loading />,
};

export const EmptyMovieDetail: StoryObj<typeof MovieDetail> = {
  name: 'Empty movie data detail',
  render: () => <MovieDetail data={emptyMovieData} />,
};
