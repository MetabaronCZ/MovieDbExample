import Joi from 'joi';
import { TFunction } from 'i18next';
import {
  Movie,
  MoviePersonData,
  FetchMovieResponse,
  FetchMoviesResponse,
} from '@project/api-types';

import { createDataParser } from 'modules/parse';

export const minYear = 1900;
export const maxYear = 1999;

export const movieYears = Array(maxYear - minYear + 1)
  .fill(0)
  .map((_, i) => minYear + i);

export const minScore = 0.0;
export const maxScore = 10.0;

export const movieScores: number[] = [];

for (let i = minScore; i <= maxScore; i = Math.round(10 * (i + 0.1)) / 10) {
  movieScores.push(i);
}

export const getMovieTitle = (novie: Movie): string => {
  let title = novie.titleCs || novie.titleOriginal;

  if (!!title && novie.year) {
    title = `${title} (${novie.year})`;
  }
  return title;
};

export const formatScore = (value: number | null, showFull = false): string => {
  if (null === value || value < minScore || value > maxScore) {
    return '-';
  }
  return showFull ? `${value} / ${maxScore}` : `${value}`;
};

export const formatMovieCount = (t: TFunction, count: number): string => {
  if (count <= 0) {
    return '-';
  }
  return `${count} ${t('movie.item', { count })}`;
};

const moviePersonDataSchema = Joi.object<MoviePersonData>({
  id: Joi.string().required(),
  name: Joi.string().allow('').required(),
}).unknown();

export const movieSchema = Joi.object<FetchMovieResponse>({
  id: Joi.string().required(),
  titleCs: Joi.string().allow('').required(),
  titleOriginal: Joi.string().allow('').required(),
  year: Joi.number().allow(null).required(),
  genres: Joi.array().items(Joi.string()),
  directors: Joi.array().items(moviePersonDataSchema),
  writers: Joi.array().items(moviePersonDataSchema),
  stars: Joi.array().items(moviePersonDataSchema),
  plot: Joi.string().allow('').required(),
  score: Joi.number().allow(null).required(),
}).unknown();

const moviesReponseSchema = Joi.object<FetchMoviesResponse>({
  items: Joi.array<Movie[]>().items(movieSchema),
  total: Joi.number(),
});

export const parseMovieResponse = createDataParser(
  movieSchema,
  'Could not parse API response for FetchMovieResponse',
);

export const parseMoviesResponse = createDataParser(
  moviesReponseSchema,
  'Could not parse API response for FetchMoviesResponse',
);
