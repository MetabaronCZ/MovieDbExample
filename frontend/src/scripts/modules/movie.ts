import Joi from 'joi';
import {
  Movie,
  FetchMovieResponse,
  FetchMoviesResponse,
} from '@project/api-types';

import { createDataParser } from 'modules/parse';

export const formatScore = (value: number | null): string => {
  return value ? `${value} / 10` : '-';
};

export const movieSchema = Joi.object<Movie>({
  id: Joi.string().required(),
  titleCs: Joi.string().allow('').required(),
  titleOriginal: Joi.string().allow('').required(),
  year: Joi.number().allow(null).required(),
  genres: Joi.array().items(Joi.string()),
  directors: Joi.array().items(Joi.string()),
  writers: Joi.array().items(Joi.string()),
  stars: Joi.array().items(Joi.string()),
  plot: Joi.string().allow('').required(),
  score: Joi.number().allow(null).required(),
}).unknown();

const moviesReponseSchema = Joi.object<FetchMoviesResponse>({
  items: Joi.array<Movie[]>().items(movieSchema),
  total: Joi.number(),
});

export const parseMovieResponse = createDataParser<FetchMovieResponse>(
  movieSchema,
  'Could not parse API response for FetchMovieResponse',
);

export const parseMoviesResponse = createDataParser(
  moviesReponseSchema,
  'Could not parse API response for FetchMoviesResponse',
);
