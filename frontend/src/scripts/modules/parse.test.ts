import Joi from 'joi';
import { describe, expect, it } from '@jest/globals';

import { createDataParser } from './parse';

const schemaSimple = Joi.string();

const schemaObject = Joi.object({
  x: Joi.number(),
  y: Joi.string(),
});

describe('modules/parse', () => {
  describe('#createDataParser', () => {
    it('should return validated data when schema OK', () => {
      const parseSimple = createDataParser(schemaSimple, 'Validation error!');
      const parseObject = createDataParser(schemaObject, 'Validation error!');

      expect(parseSimple('A')).toEqual('A');
      expect(parseObject({ x: 1, y: 'A' })).toEqual({ x: 1, y: 'A' });
    });

    it('should throw error when data not valid', () => {
      const parseSimple = createDataParser(schemaSimple, 'Validation error!');
      const parseObject = createDataParser(schemaObject, 'Validation error!');

      expect(() => {
        parseSimple(1);
      }).toThrow('Validation error!');

      expect(() => {
        parseObject({ x: 1, y: 2 });
      }).toThrow('Validation error!');
    });
  });
});
