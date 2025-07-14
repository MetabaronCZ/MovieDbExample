import {
  Movie,
  MovieSort,
  MovieGenre,
  MovieFilter,
  SortDirection,
  movieSorts,
  movieGenres,
  MoviePersonData,
} from '@project/api-types';

import { parseQueryParam, Query } from 'utils/common';
import { compareNumeric, isSortDirection } from 'utils/sort';

const movieSortValues = [...movieSorts] as string[];
const movieGenreValues = movieGenres.map((item) => item.toLowerCase());

const isMovieSort = (value: string): value is MovieSort => {
  return movieSortValues.includes(value);
};

const isMovieGenre = (value: string): value is MovieGenre => {
  return movieGenreValues.includes(value);
};

const isDefined = <T>(value: T | undefined): value is T => {
  return 'undefined' !== typeof value;
};

const parseIntNumber = (value: string): number | undefined => {
  const nr = parseInt(value, 10);
  return !isNaN(nr) ? nr : undefined;
};

const parseFloatNumber = (value: string): number | undefined => {
  const nr = parseFloat(value);
  return !isNaN(nr) ? nr : undefined;
};

const parseArray = (value: string): string[] => {
  return value
    .split(',')
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
  const yearFromParsed = parseIntNumber(yearFrom);
  const yearToParsed = parseIntNumber(yearTo);
  const scoreFromParsed = parseFloatNumber(scoreFrom);
  const scoreToParsed = parseFloatNumber(scoreTo);
  const pageParsed = parseIntNumber(page);
  const perPageParsed = parseIntNumber(perPage);
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
    sortDirection: isSortDirection(sortDirectionParsed)
      ? sortDirectionParsed
      : undefined,
  };

  return filter;
};

// movie person list filter helper
const filterPersonContained = (
  filter?: string[],
  value?: MoviePersonData[],
): boolean => {
  return (
    !filter ||
    0 === filter.length ||
    !!value?.some((item) => filter.includes(item.id))
  );
};

// movie array filter helper
const filterContained = (filter?: string[], value?: string[]): boolean => {
  return (
    !filter ||
    0 === filter.length ||
    !!value?.some((item) => filter.includes(item.toLowerCase()))
  );
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
    if (
      isDefined(filter.yearFrom) &&
      null !== item.year &&
      item.year < filter.yearFrom
    ) {
      return false;
    }

    // filter by year to
    if (
      isDefined(filter.yearTo) &&
      null !== item.year &&
      item.year > filter.yearTo
    ) {
      return false;
    }

    // filter by score from
    if (
      isDefined(filter.scoreFrom) &&
      null !== item.score &&
      item.score < filter.scoreFrom
    ) {
      return false;
    }

    // filter by score to
    if (
      isDefined(filter.scoreTo) &&
      null !== item.score &&
      item.score > filter.scoreTo
    ) {
      return false;
    }

    // filter by directors
    if (!filterPersonContained(filter.directors, item.directors)) {
      return false;
    }

    // filter by writers
    if (!filterPersonContained(filter.writers, item.writers)) {
      return false;
    }

    // filter by cast
    if (!filterPersonContained(filter.stars, item.stars)) {
      return false;
    }

    // filter by genre
    if (!filterContained(filter.genres, item.genres)) {
      return false;
    }

    return true;
  });
};
