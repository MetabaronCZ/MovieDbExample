import { ENV } from 'modules/env';

/* eslint-disable no-console */
export const Logger = {
  log: (...args: unknown[]) => {
    if (ENV.isDevMode()) {
      console.log(...args);
    }
  },
  error: (...args: unknown[]) => {
    if (ENV.isDevMode()) {
      console.error(...args);
    }
  },
};
