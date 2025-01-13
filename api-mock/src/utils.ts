import { Request } from 'express';

const wait = (delay: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export const requestDelay = (cb: () => void): void => {
  const delay = 800 + Math.floor(400 * Math.random());
  wait(delay)
    .then(cb)
    .catch((error: unknown) => {
      console.error(error);
    });
};

// extract simple string value from Express query parameter result
export const parseQueryParam = (param: Request['query'][number]): string => {
  const value = Array.isArray(param) ? param[0] : param;
  return 'string' === typeof value ? value : '';
};
