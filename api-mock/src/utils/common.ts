import { Request } from 'express';

export type QueryParam = Request['query'][number];
export type Query = Record<string, QueryParam>;

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
export const parseQueryParam = (param: QueryParam): string => {
  const value = Array.isArray(param) ? param[0] : param;
  return 'string' === typeof value ? value : '';
};

type Entries<T extends Record<string, unknown>> = {
  readonly [K in keyof T]: [K, T[K]];
}[keyof T][];

// extract object entries, correctly typed
export const getObjectEntries = <T extends Record<string, unknown>>(
  obj: T,
): Entries<T> => {
  return Object.entries(obj) as Entries<T>;
};
