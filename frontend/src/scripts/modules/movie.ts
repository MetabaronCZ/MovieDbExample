import Joi from 'joi';
import { TFunction } from 'i18next';
import {
  Movie,
  MoviePersonData,
  FetchMovieResponse,
  FetchMoviesResponse,
} from '@project/api-types';

import { createDataParser } from 'modules/parse';

export const getMovieTitle = (novie: Movie): string => {
  let title = novie.titleCs || novie.titleOriginal;

  if (!!title && novie.year) {
    title = `${title} (${novie.year})`;
  }
  return title;
};

export const formatScore = (value: number | null): string => {
  if (null === value || value < 0 || value > 10) {
    return '-';
  }
  return `${value} / 10`;
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
