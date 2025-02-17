import { Person } from '@project/api-types';
import type { Meta, StoryObj } from '@storybook/react';

import { PersonDetail } from 'components/person/PersonDetail';

const personData: Person = {
  id: '1',
  name: 'Some person',
  director: ['1'],
  writer: ['1', '2'],
  star: ['1', '2', '3'],
};

const emptyPersonData: Person = {
  id: '1',
  name: '',
  director: [],
  writer: [],
  star: [],
};

const meta: Meta<typeof PersonDetail> = {
  component: PersonDetail,
};

export default meta;

export const DefaultPersonDetail: StoryObj<typeof PersonDetail> = {
  name: 'Default person detail',
  render: () => <PersonDetail data={personData} />,
};

export const EmptyPersonDetail: StoryObj<typeof PersonDetail> = {
  name: 'Empty person data detail',
  render: () => <PersonDetail data={emptyPersonData} />,
};
