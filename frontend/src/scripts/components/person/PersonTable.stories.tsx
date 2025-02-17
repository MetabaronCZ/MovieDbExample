import { Person } from '@project/api-types';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { PersonTable } from 'components/person/PersonTable';

const getRandomArray = (): string[] => {
  const size = Math.floor(10 * Math.random());
  return Array(size).map((_, i) => `${i}`);
};

const personData: Person[] = Array(10)
  .fill(0)
  .map((_, i) => ({
    id: `${i}`,
    name: `Person name ${i}`,
    director: getRandomArray(),
    writer: getRandomArray(),
    star: getRandomArray(),
  }));

const meta: Meta<typeof PersonTable> = {
  component: PersonTable,
};

export default meta;

export const DefaultMovieTable: StoryObj<typeof PersonTable> = {
  name: 'Default person table',
  render: () => <PersonTable data={personData} />,
};

export const LoadingMovieTable: StoryObj<typeof PersonTable> = {
  name: 'Loading person table',
  render: () => <PersonTable data={personData} isLoading />,
};

export const ErrorMovieTable: StoryObj<typeof PersonTable> = {
  name: 'Error person table',
  render: () => <PersonTable data={personData} error="Some table data error" />,
};

export const SortedMovieTable: StoryObj<typeof PersonTable> = {
  name: 'Person table sort',
  render: () => (
    <PersonTable
      data={personData}
      sort="name"
      sortDirection="ascending"
      onSort={action('Sort!')}
    />
  ),
};

export const EmptyMovieTable: StoryObj<typeof PersonTable> = {
  name: 'Empty person table',
  render: () => <PersonTable data={[]} />,
};
