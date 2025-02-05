import {
  Person,
  PersonRole,
  PersonSort,
  PersonFilter,
  SortDirection,
  personRoles,
  personSorts,
} from '@project/api-types';

import { parseQueryParam, Query } from 'utils/common';
import { compareNumeric, isSortDirection } from 'utils/sort';

const personSortValues = [...personSorts] as string[];
const personRoleValues = [...personRoles] as string[];

const isPersonSort = (value: string): value is PersonSort => {
  return personSortValues.includes(value);
};

const isPersonRole = (value: string): value is PersonRole => {
  return personRoleValues.includes(value);
};

const parseInteger = (value: string): number | undefined => {
  const nr = parseInt(value, 10);
  return !isNaN(nr) ? nr : undefined;
};

// parse movie filter from request query
export const parsePersonFilter = (requestQuery: Query): PersonFilter => {
  // extract parameters
  const query = parseQueryParam(requestQuery.query);
  const role = parseQueryParam(requestQuery.role);
  const page = parseQueryParam(requestQuery.page);
  const perPage = parseQueryParam(requestQuery.perPage);
  const sort = parseQueryParam(requestQuery.sort);
  const sortDirection = parseQueryParam(requestQuery.sortDirection);

  // parse values
  const queryParsed = query.trim().toLowerCase();
  const roleParsed = role.trim().toLowerCase();
  const pageParsed = parseInteger(page);
  const perPageParsed = parseInteger(perPage);
  const sortParsed = sort.trim().toLowerCase();
  const sortDirectionParsed = sortDirection.trim().toLowerCase();

  const filter: PersonFilter = {
    query: queryParsed,
    role: isPersonRole(roleParsed) ? roleParsed : undefined,
    page: pageParsed,
    perPage: perPageParsed,
    sort: isPersonSort(sortParsed) ? sortParsed : undefined,
    sortDirection: isSortDirection(sortDirectionParsed)
      ? sortDirectionParsed
      : undefined,
  };

  return filter;
};

export const sortPeople = (
  people: Person[],
  sort?: PersonSort,
  direction?: SortDirection,
): Person[] => {
  const sorted = [...people];

  switch (sort) {
    case 'name': {
      return sorted.sort((a, b) => {
        return 'descending' === direction
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name);
      });
    }
    case 'director':
      return sorted.sort((a, b) => {
        return compareNumeric(a.director.length, b.director.length, direction);
      });
    case 'writer':
      return sorted.sort((a, b) => {
        return compareNumeric(a.writer.length, b.writer.length, direction);
      });
    case 'star':
      return sorted.sort((a, b) => {
        return compareNumeric(a.star.length, b.star.length, direction);
      });
    default:
      return sorted;
  }
};

export const filterPeople = (
  people: Person[],
  filter: PersonFilter,
): Person[] => {
  return people.filter((item) => {
    // filter by query
    if (filter.query && !item.name.toLowerCase().includes(filter.query)) {
      return false;
    }

    // filter by person role
    if (filter.role && 0 === item[filter.role].length) {
      return false;
    }

    return true;
  });
};
