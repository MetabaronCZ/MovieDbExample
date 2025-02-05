import fs from 'fs';
import unzipper from 'unzipper';
import {
  Movie,
  MovieData,
  MovieFilter,
  MoviesFiltered,
  defaultPerPage,
  defaultMovieSort,
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
  // read data
  const buffer = fs.readFileSync(dataPath);
  const archive = await unzipper.Open.buffer(buffer);
  const file = archive.files[0];
  const fileBuffer = await file.buffer(parseHash(hash));
  const fileString = fileBuffer.toString();
  const movies = JSON.parse(fileString) as Movie[];

  // filter valid movie data
  const validItems = movies.filter((item) => {
    if (item.year && (item.year < 1900 || item.year > 1999)) {
      return false;
    }
    if (!item.score || item.score < 5) {
      return false;
    }
    return !!item.titleCs || !!item.titleOriginal;
  });

  // initial sort
  const sorted = sortMovies(validItems, defaultMovieSort);

  return sorted;
};

// get movie by ID
export const getMovie = (movies: Movie[], id: string): Movie | null => {
  return movies.find((item) => id === item.id) ?? null;
};

// update movie data
export const editMovie = (
  movies: Movie[],
  id: string,
  data: MovieData,
): Movie | null => {
  const index = movies.findIndex((item) => id === item.id);

  if (-1 === index) {
    return null;
  }
  const movie: Movie = { ...movies[index], ...data };
  movies[index] = movie;

  return movie;
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
