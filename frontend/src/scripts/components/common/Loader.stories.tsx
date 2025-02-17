import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
  component: Loader,
};

export default meta;

export const DefaultLoader: StoryObj<typeof Loader> = {
  name: 'Default Loader',
  render: () => <Loader />,
};
