import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumbs } from 'components/common/Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  component: Breadcrumbs,
};

export default meta;

export const DefaultBreadcrumbs: StoryObj<typeof Breadcrumbs> = {
  name: 'Default breadcrumbs',
  render: () => (
    <Breadcrumbs items={['homepage', 'movieList', 'movieDetail']} />
  ),
};

export const EmptyBreadcrumbs: StoryObj<typeof Breadcrumbs> = {
  name: 'Empty breadcrumbs',
  render: () => <Breadcrumbs />,
};
