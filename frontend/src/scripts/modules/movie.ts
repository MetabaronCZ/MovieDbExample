import Joi from 'joi';
import { FetchMoviesResponse, Movie } from '@project/api-types';

import { createDataParser } from 'modules/parse';

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

export const parseMoviesResponse = createDataParser(
  moviesReponseSchema,
  'Could not parse API response for FetchMoviesResponse',
);
