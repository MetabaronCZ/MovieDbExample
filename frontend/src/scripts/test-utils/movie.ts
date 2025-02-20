import { Movie } from '@project/api-types';

export const createTestMovie = (data: Partial<Movie> = {}): Movie => ({
  id: '0',
  titleCs: '',
  titleOriginal: '',
  year: null,
  score: null,
  genres: [],
  directors: [],
  writers: [],
  stars: [],
  plot: '',
  ...data,
});
