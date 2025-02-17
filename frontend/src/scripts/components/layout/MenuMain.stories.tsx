import type { Meta, StoryObj } from '@storybook/react';
import { MenuMain } from 'components/layout/MenuMain';

const meta: Meta<typeof MenuMain> = {
  component: MenuMain,
};

export default meta;

export const DefaultMenuMain: StoryObj<typeof MenuMain> = {
  name: 'Default MenuMain',
  render: () => <MenuMain />,
};
