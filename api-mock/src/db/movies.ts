import fs from 'fs';
import unzipper from 'unzipper';
import {
  Movie,
  MovieData,
  MovieGenre,
  MovieFilter,
  MoviesFiltered,
  defaultPerPage,
  defaultMovieSort,
  Person,
  MoviePersonData,
} from '@project/api-types';

import { filterMovies, sortMovies } from 'utils/movie';
import { getPerson } from 'db/people';

const dataPath = './src/data/movies.zip';
const hash = 'oqxkgu/fd/wuc/3;22/3;;;';

// hashed data schema
interface MovieSource {
  readonly id: string;
  readonly titleCs: string;
  readonly titleOriginal: string;
  readonly year: number | null;
  readonly genres: string[];
  readonly directors: string[];
  readonly writers: string[];
  readonly stars: string[];
  readonly plot: string;
  readonly score: number | null;
}

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
  const sourceData = JSON.parse(fileString) as MovieSource[];

  // filter valid data
  const validItems = sourceData.filter((item) => {
    if (item.year && (item.year < 1900 || item.year > 1999)) {
      return false;
    }
    if (!item.score || item.score < 5) {
      return false;
    }
    return !!item.titleCs || !!item.titleOriginal;
  });

  // convert movies source data to Movie list
  const movies: Movie[] = validItems.map((item) => ({
    ...item,
    genres: item.genres as MovieGenre[],
    directors: item.directors.map((name) => ({ id: '', name })),
    writers: item.writers.map((name) => ({ id: '', name })),
    stars: item.stars.map((name) => ({ id: '', name })),
  }));

  // initial sort
  const sorted = sortMovies(movies, defaultMovieSort);

  return sorted;
};

// get movie by ID
export const getMovie = (movies: Movie[], id: string): Movie | null => {
  return movies.find((item) => id === item.id) ?? null;
};

const extractMoviePeopleData = (
  people: Person[],
  ids?: string[],
): MoviePersonData[] => {
  if (!ids || 0 === ids.length) {
    return [];
  }
  const result = ids.map((id) => {
    const data = getPerson(people, id);
    return data ? { id, name: data.name } : null;
  });
  return result.filter((item) => !!item);
};

// update movie data
export const editMovie = (
  movies: Movie[],
  people: Person[],
  id: string,
  data: MovieData,
): Movie | null => {
  const index = movies.findIndex((item) => id === item.id);

  if (-1 === index) {
    return null;
  }
  const movie: Movie = {
    ...movies[index],
    ...data,
    directors: extractMoviePeopleData(people, data.directors),
    writers: extractMoviePeopleData(people, data.writers),
    stars: extractMoviePeopleData(people, data.stars),
  };
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
