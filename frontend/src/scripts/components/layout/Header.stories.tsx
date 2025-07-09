import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Header } from 'components/layout/Header';

const meta: Meta<typeof Header> = {
  component: Header,
};

export default meta;

export const DefaultHeader: StoryObj<typeof Header> = {
  render: () => <Header />,
};
