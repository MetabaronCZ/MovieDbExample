import { SortDirection } from './common';

export const personRoles = ['director', 'writer', 'star'] as const;
export type PersonRole = (typeof personRoles)[number];

export interface Person {
  readonly id: string;
  readonly name: string;
  readonly director: string[]; // movie IDs
  readonly writer: string[]; // movie IDs
  readonly star: string[]; // movie IDs
}

export const personSorts = ['name', 'director', 'writer', 'star'] as const;
export type PersonSort = (typeof personSorts)[number];
export const defaultPersonSort = personSorts[0];

export interface PersonFilter {
  readonly query?: string;
  readonly role?: PersonRole;
  readonly page?: number;
  readonly perPage?: number;
  readonly sort?: PersonSort;
  readonly sortDirection?: SortDirection;
}

export interface PeopleFiltered {
  readonly items: Person[];
  readonly total: number;
}

export type FetchPersonResponse = Person;
export type FetchPeopleResponse = PeopleFiltered;
