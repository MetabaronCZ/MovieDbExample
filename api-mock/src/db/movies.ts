import fs from 'fs';
import unzipper from 'unzipper';
import {
  Movie,
  MovieFilter,
  MoviesFiltered,
  defaultPerPage,
} from '@project/api-types';
import { filterMovies, sortMovies } from 'utils/movie';

const dataPath = './src/data/movies.zip';
const hash = 'oqxkgu/fd/wuc/3;22/3;;;';

const parseHash = (value: string): string => {
  const items = value.split('');
  const parsed = items.map((_) =>
    String.fromCodePoint((_.codePointAt(0) ?? 0) - 2),
  );
  return parsed.join('');
};

export const createMovieData = async (): Promise<Movie[]> => {
  const buffer = fs.readFileSync(dataPath);
  const archive = await unzipper.Open.buffer(buffer);
  const file = archive.files[0];
  const fileBuffer = await file.buffer(parseHash(hash));
  const fileString = fileBuffer.toString();
  const movies = JSON.parse(fileString) as Movie[];
  return movies;
};

// get movie by ID
export const getMovie = (movies: Movie[], id: string): Movie | null => {
  return movies.find((item) => id === item.id) ?? null;
};

// get sorted / filtered movie list
export const getMovies = (
  movies: Movie[],
  filter: MovieFilter = {},
): MoviesFiltered => {
  // filter
  const filtered = filterMovies(movies, filter);
  const total = filtered.length;

  // sort
  const sorted = sortMovies(filtered, filter.sort, filter.sortDirection);

  // paging
  const page = filter.page ?? 0;
  const perPage = filter.perPage ?? defaultPerPage;
  const start = page * perPage;
  const end = start + perPage;
  const result = sorted.slice(start, end);

  return {
    items: result,
    total,
  };
};
