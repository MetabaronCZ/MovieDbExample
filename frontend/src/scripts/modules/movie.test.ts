import { t } from 'i18next';

import { describe, expect, it } from '@jest/globals';
import { createTestMovie } from 'test-utils/movie';

import { formatMovieCount, formatScore, getMovieTitle } from 'modules/movie';

describe('modules/movie', () => {
  describe('#getMovieTitle', () => {
    it('should return formatted movie title', () => {
      let movie = createTestMovie({
        titleCs: 'A',
        titleOriginal: '',
        year: null,
      });
      expect(getMovieTitle(movie)).toEqual('A');

      movie = createTestMovie({ titleCs: '', titleOriginal: 'B', year: null });
      expect(getMovieTitle(movie)).toEqual('B');

      movie = createTestMovie({ titleCs: 'A', titleOriginal: 'B', year: null });
      expect(getMovieTitle(movie)).toEqual('A');

      movie = createTestMovie({ titleCs: 'A', titleOriginal: '', year: 1990 });
      expect(getMovieTitle(movie)).toEqual('A (1990)');

      movie = createTestMovie({ titleCs: '', titleOriginal: 'B', year: 1990 });
      expect(getMovieTitle(movie)).toEqual('B (1990)');

      movie = createTestMovie({ titleCs: 'A', titleOriginal: 'B', year: 1990 });
      expect(getMovieTitle(movie)).toEqual('A (1990)');

      movie = createTestMovie({ titleCs: '', titleOriginal: '', year: null });
      expect(getMovieTitle(movie)).toEqual('');

      movie = createTestMovie({ titleCs: '', titleOriginal: '', year: 1990 });
      expect(getMovieTitle(movie)).toEqual('');
    });
  });

  describe('#formatScore', () => {
    it('should format movie score value', () => {
      expect(formatScore(0)).toEqual('0 / 10');
      expect(formatScore(1)).toEqual('1 / 10');
      expect(formatScore(2)).toEqual('2 / 10');
      expect(formatScore(9)).toEqual('9 / 10');
      expect(formatScore(10)).toEqual('10 / 10');

      expect(formatScore(0.1)).toEqual('0.1 / 10');
      expect(formatScore(6.07)).toEqual('6.07 / 10');

      expect(formatScore(-1)).toEqual('-');
      expect(formatScore(11)).toEqual('-');

      expect(formatScore(null)).toEqual('-');
    });
  });

  describe('#formatMovieCount', () => {
    it('should format movie count', () => {
      expect(formatMovieCount(t, 1)).toEqual('1 film');
      expect(formatMovieCount(t, 2)).toEqual('2 filmy');
      expect(formatMovieCount(t, 3)).toEqual('3 filmy');
      expect(formatMovieCount(t, 5)).toEqual('5 filmů');
      expect(formatMovieCount(t, 10)).toEqual('10 filmů');
      expect(formatMovieCount(t, 0)).toEqual('-');
      expect(formatMovieCount(t, -1)).toEqual('-');
    });
  });
});
