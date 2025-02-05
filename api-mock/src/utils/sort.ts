import { SortDirection, sortDirections } from '@project/api-types';

const movieSortDirectionValues = [...sortDirections] as string[];

export const isSortDirection = (value: string): value is SortDirection => {
  return movieSortDirectionValues.includes(value);
};

// sort numeral value comparison
export const compareNumeric = (
  a: number | null,
  b: number | null,
  direction?: SortDirection,
): number => {
  if (null === b && null === a) {
    return 0;
  } else if (null === a) {
    return 'descending' === direction ? +1 : -1;
  } else if (null === b) {
    return 'descending' === direction ? -1 : +1;
  } else {
    return 'descending' === direction ? b - a : a - b;
  }
};
