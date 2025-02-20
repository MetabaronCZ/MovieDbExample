import { describe, expect, it, jest } from '@jest/globals';

import { Logger } from './logger';
import { ENV as envOriginal } from './env';

// mock ENV config
jest.mock('./env');
const ENV = envOriginal as jest.Mocked<typeof envOriginal>;

describe('modules/logger', () => {
  describe('Logger.log', () => {
    it('should call console.log when in dev mode', () => {
      const logMock = jest.spyOn(console, 'log').mockImplementation(() => null);
      ENV.isDevMode.mockReturnValue(true);

      Logger.log('Logger.log OK');
      expect(logMock).toBeCalledTimes(1);
      expect(logMock).toBeCalledWith('Logger.log OK');
    });

    it('should call not console.log when not in dev mode', () => {
      const logMock = jest.spyOn(console, 'log').mockImplementation(() => null);
      ENV.isDevMode.mockReturnValue(false);

      Logger.log('Logger.log OK');
      expect(logMock).not.toBeCalled();
    });
  });

  describe('Logger.error', () => {
    it('should call console.error when in dev mode', () => {
      ENV.isDevMode.mockReturnValue(true);

      const errorMock = jest
        .spyOn(console, 'error')
        .mockImplementation(() => null);

      Logger.error('Logger.error OK');
      expect(errorMock).toBeCalledTimes(1);
      expect(errorMock).toBeCalledWith('Logger.error OK');
    });

    it('should call not console.error when not in dev mode', () => {
      ENV.isDevMode.mockReturnValue(false);

      const errorMock = jest
        .spyOn(console, 'error')
        .mockImplementation(() => null);

      Logger.error('Logger.error OK');
      expect(errorMock).not.toBeCalled();
    });
  });
});
