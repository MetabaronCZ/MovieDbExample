import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { PersonListFilter } from 'components/person/PersonListFilter';

const meta: Meta<typeof PersonListFilter> = {
  component: PersonListFilter,
};

export default meta;

export const DefaultPersonListFilter: StoryObj<typeof PersonListFilter> = {
  name: 'Default person filter',
  render: () => <PersonListFilter onChange={action('Change!')} />,
};

export const LoadingPersonListFilter: StoryObj<typeof PersonListFilter> = {
  name: 'Loading person filter',
  render: () => <PersonListFilter isLoading onChange={action('Change!')} />,
};
