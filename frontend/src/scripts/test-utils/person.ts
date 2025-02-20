import { Person } from '@project/api-types';

export const createTestPerson = (data: Partial<Person> = {}): Person => ({
  id: '0',
  name: '',
  director: [],
  writer: [],
  star: [],
  ...data,
});
