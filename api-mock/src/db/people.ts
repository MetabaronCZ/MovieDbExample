import {
  Movie,
  Person,
  PersonFilter,
  PeopleFiltered,
  defaultPerPage,
  defaultPersonSort,
} from '@project/api-types';
import { getObjectEntries } from 'utils/common';

import { filterPeople, sortPeople } from 'utils/person';

// person ID counter
let personId = 0;

// movie-person attribute map
const roleMap = {
  directors: 'director',
  writers: 'writer',
  stars: 'star',
} as const;

const createPerson = (name: string): Person => ({
  id: `${personId++}`,
  name,
  director: [],
  writer: [],
  star: [],
});

export const createPeopleData = (movies: Movie[]): Person[] => {
  const people: Record<string, Person> = {};
  const roleAttributes = getObjectEntries(roleMap);

  for (const movie of movies) {
    for (const [movieAttr, personAttr] of roleAttributes) {
      movie[movieAttr].forEach(({ name }, i) => {
        if (!(name in people)) {
          const person = createPerson(name);
          people[name] = person;
        }
        people[name][personAttr].push(movie.id); // add movie ID to person data
        movie[movieAttr][i] = { id: people[name].id, name }; // update movie person ID
      });
    }
  }
  const result = Object.values(people);

  // initial sort
  const sorted = sortPeople(result, defaultPersonSort);

  return sorted;
};

// get person by ID
export const getPerson = (people: Person[], id: string): Person | null => {
  return people.find((item) => id === item.id) ?? null;
};

// get sorted / filtered people list
export const getPeople = (
  people: Person[],
  filter: PersonFilter = {},
): PeopleFiltered => {
  // filter
  const filtered = filterPeople(people, filter);
  const total = filtered.length;

  // sort
  const sorted = sortPeople(filtered, filter.sort, filter.sortDirection);

  // paging
  const page = filter.page ?? 0;
  const perPage = filter.perPage ?? defaultPerPage;
  const start = page * perPage;
  const end = start + perPage;
  const result = sorted.slice(start, end);

  return {
    items: result,
    total,
  };
};
