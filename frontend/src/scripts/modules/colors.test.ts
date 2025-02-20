import { describe, expect, it } from '@jest/globals';
import { addAlpha } from './colors';

describe('modules/color', () => {
  describe('#addAlpha', () => {
    it('should add alpha channel to given color', () => {
      expect(addAlpha('#ffffff', 1.0)).toEqual('#ffffffff');
      expect(addAlpha('#c0c0c0', 1.0)).toEqual('#c0c0c0ff');
      expect(addAlpha('#000000', 1.0)).toEqual('#000000ff');
      expect(addAlpha('#ffffff', 0.0)).toEqual('#ffffff00');
      expect(addAlpha('#c0c0c0', 0.0)).toEqual('#c0c0c000');
      expect(addAlpha('#000000', 0.0)).toEqual('#00000000');
      expect(addAlpha('#ffffff', 0.5)).toEqual('#ffffff80');
      expect(addAlpha('#c0c0c0', 0.5)).toEqual('#c0c0c080');
      expect(addAlpha('#000000', 0.5)).toEqual('#00000080');
    });

    it('should clamp alpha value to interval <0, 1>', () => {
      expect(addAlpha('#ffffff', -1.0)).toEqual('#ffffff00');
      expect(addAlpha('#ffffff', -0.1)).toEqual('#ffffff00');
      expect(addAlpha('#ffffff', +1.1)).toEqual('#ffffffff');
      expect(addAlpha('#ffffff', +2.0)).toEqual('#ffffffff');
    });

    it('should throw on invalid input color', () => {
      expect(() => addAlpha('ffffff', 1)).toThrow();
      expect(() => addAlpha('fff', 1)).toThrow();
      expect(() => addAlpha('#fff', 1)).toThrow();
      expect(() => addAlpha('#ffffffff', 1)).toThrow();
      expect(() => addAlpha('', 1)).toThrow();
    });
  });
});
