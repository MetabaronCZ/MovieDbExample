type Entries<T extends Record<string, unknown>> = {
  readonly [K in keyof T]: [K, T[K]];
}[keyof T][];

// extract object entries, correctly typed
export const getObjectEntries = <T extends Record<string, unknown>>(
  obj: T,
): Entries<T> => {
  return Object.entries(obj) as Entries<T>;
};
