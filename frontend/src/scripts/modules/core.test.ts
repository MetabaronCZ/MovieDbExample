import { describe, expect, it } from '@jest/globals';
import { getObjectEntries } from './core';

const testCases = [
  {
    item: {
      a: 1,
      b: 'A',
      c: null,
      d: undefined,
    },
    result: [
      ['a', 1],
      ['b', 'A'],
      ['c', null],
      ['d', undefined],
    ],
  },
  {
    item: { x: 1 },
    result: [['x', 1]],
  },
  {
    item: { x: null },
    result: [['x', null]],
  },
  {
    item: { x: undefined },
    result: [['x', undefined]],
  },
  {
    item: {},
    result: [],
  },
];

describe('modules/core', () => {
  describe('#getObjectEntries', () => {
    it('should return object entries as an array', () => {
      for (const { item, result } of testCases) {
        expect(getObjectEntries(item)).toEqual(result);
      }
    });
  });
});
