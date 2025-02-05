import Joi from 'joi';
import {
  Person,
  FetchPersonResponse,
  FetchPeopleResponse,
} from '@project/api-types';

import { createDataParser } from 'modules/parse';

export const personSchema = Joi.object<FetchPersonResponse>({
  id: Joi.string().required(),
  name: Joi.string().allow('').required(),
  director: Joi.array().items(Joi.string()),
  writer: Joi.array().items(Joi.string()),
  star: Joi.array().items(Joi.string()),
}).unknown();

const peopleReponseSchema = Joi.object<FetchPeopleResponse>({
  items: Joi.array<Person[]>().items(personSchema),
  total: Joi.number(),
});

export const parsePersonResponse = createDataParser(
  personSchema,
  'Could not parse API response for FetchPersonResponse',
);

export const parsePeopleResponse = createDataParser(
  peopleReponseSchema,
  'Could not parse API response for FetchPeopleResponse',
);
