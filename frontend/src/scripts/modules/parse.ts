import Joi from 'joi';
import { Logger } from './logger';

export type ParseFn<T> = (data: unknown) => T;

// create schema validation function
export const createDataParser = <T>(
  schema: Joi.Schema<T>,
  errorMessage: string,
): ParseFn<T> => {
  return (data) => {
    const { value, error } = schema.validate(data);

    if (error) {
      const parseError = new Error(errorMessage, { cause: error });
      Logger.error(parseError);
      throw parseError;
    }
    return value;
  };
};
