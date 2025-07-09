import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
  component: Loader,
};

export default meta;

export const DefaultLoader: StoryObj<typeof Loader> = {
  render: () => <Loader />,
};
