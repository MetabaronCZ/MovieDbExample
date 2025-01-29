import {
  Movie,
  MovieSort,
  MovieFilter,
  movieSorts,
  sortDirections,
  SortDirection,
  movieGenres,
  MovieGenre,
} from '@project/api-types';

import { parseQueryParam, Query } from 'utils/common';

const movieSortValues = [...movieSorts] as string[];
const movieGenreValues = [...movieGenres] as string[];
const movieSortDirectionValues = [...sortDirections] as string[];

const isMovieSort = (value: string): value is MovieSort => {
  return movieSortValues.includes(value);
};

const isMovieSortDirection = (value: string): value is SortDirection => {
  return movieSortDirectionValues.includes(value);
};

const isMovieGenre = (value: string): value is MovieGenre => {
  return movieGenreValues.includes(value);
};

const parseInteger = (value: string): number | undefined => {
  const nr = parseInt(value, 10);
  return !isNaN(nr) ? nr : undefined;
};

const parseArray = (value: string): string[] => {
  return value
    .split('|')
    .map((item) => item.trim().toLowerCase())
    .filter((item) => !!item);
};

// parse movie filter from request query
export const parseMovieFilter = (requestQuery: Query): MovieFilter => {
  // extract parameters
  const query = parseQueryParam(requestQuery.query);
  const yearFrom = parseQueryParam(requestQuery.yearFrom);
  const yearTo = parseQueryParam(requestQuery.yearTo);
  const scoreFrom = parseQueryParam(requestQuery.scoreFrom);
  const scoreTo = parseQueryParam(requestQuery.scoreTo);
  const directors = parseQueryParam(requestQuery.directors);
  const writers = parseQueryParam(requestQuery.writers);
  const stars = parseQueryParam(requestQuery.stars);
  const genres = parseQueryParam(requestQuery.genres);
  const page = parseQueryParam(requestQuery.page);
  const perPage = parseQueryParam(requestQuery.perPage);
  const sort = parseQueryParam(requestQuery.sort);
  const sortDirection = parseQueryParam(requestQuery.sortDirection);

  // parse values
  const queryParsed = query.trim().toLowerCase();
  const yearFromParsed = parseInteger(yearFrom);
  const yearToParsed = parseInteger(yearTo);
  const scoreFromParsed = parseInteger(scoreFrom);
  const scoreToParsed = parseInteger(scoreTo);
  const pageParsed = parseInteger(page);
  const perPageParsed = parseInteger(perPage);
  const sortParsed = sort.trim().toLowerCase();
  const sortDirectionParsed = sortDirection.trim().toLowerCase();

  const starsParsed = parseArray(stars);
  const directorsParsed = parseArray(directors);
  const writersParsed = parseArray(writers);

  const genresParsed = parseArray(genres);
  const genresFiltered = genresParsed.filter(isMovieGenre);

  const filter: MovieFilter = {
    query: queryParsed,
    yearFrom: yearFromParsed,
    yearTo: yearToParsed,
    genres: genresFiltered,
    directors: directorsParsed,
    writers: writersParsed,
    stars: starsParsed,
    scoreFrom: scoreFromParsed,
    scoreTo: scoreToParsed,
    page: pageParsed,
    perPage: perPageParsed,
    sort: isMovieSort(sortParsed) ? sortParsed : undefined,
    sortDirection: isMovieSortDirection(sortDirectionParsed)
      ? sortDirectionParsed
      : undefined,
  };

  return filter;
};

// movie array filter helper
const filterContained = (filter?: string[], value?: string[]): boolean => {
  return (
    !filter ||
    0 === filter.length ||
    !!value?.some((item) => filter.includes(item.toLowerCase()))
  );
};

// movie numeral value comparison
const compareNumeric = (
  a: number | null,
  b: number | null,
  direction?: SortDirection,
): number => {
  if (null === b && null === a) {
    return 0;
  } else if (null === a) {
    return 'descending' === direction ? +1 : -1;
  } else if (null === b) {
    return 'descending' === direction ? -1 : +1;
  } else {
    return 'descending' === direction ? b - a : a - b;
  }
};

export const sortMovies = (
  movies: Movie[],
  sort?: MovieSort,
  direction?: SortDirection,
): Movie[] => {
  const sorted = [...movies];

  switch (sort) {
    case 'title': {
      return sorted.sort((a, b) => {
        const aTitle = a.titleCs || a.titleOriginal;
        const bTitle = b.titleCs || b.titleOriginal;
        return 'descending' === direction
          ? bTitle.localeCompare(aTitle)
          : aTitle.localeCompare(bTitle);
      });
    }
    case 'year':
      return sorted.sort((a, b) => {
        return compareNumeric(a.year, b.year, direction);
      });
    case 'score':
      return sorted.sort((a, b) => {
        return compareNumeric(a.score, b.score, direction);
      });
    default:
      return sorted;
  }
};

export const filterMovies = (movies: Movie[], filter: MovieFilter): Movie[] => {
  return movies.filter((item) => {
    // filter by query
    if (
      filter.query &&
      !item.titleCs.toLowerCase().includes(filter.query) &&
      !item.titleOriginal.toLowerCase().includes(filter.query) &&
      !item.plot.toLowerCase().includes(filter.query)
    ) {
      return false;
    }

    // filter by year from
    if (filter.yearFrom && item.year && item.year < filter.yearFrom) {
      return false;
    }

    // filter by year to
    if (filter.yearTo && item.year && item.year > filter.yearTo) {
      return false;
    }

    // filter by directors
    if (!filterContained(filter.directors, item.directors)) {
      return false;
    }

    // filter by writers
    if (!filterContained(filter.writers, item.writers)) {
      return false;
    }

    // filter by cast
    if (!filterContained(filter.stars, item.stars)) {
      return false;
    }

    // filter by genre
    if (!filterContained(filter.genres, item.genres)) {
      return false;
    }

    return true;
  });
};
