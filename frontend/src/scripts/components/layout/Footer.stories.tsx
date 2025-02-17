import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from 'components/layout/Footer';

const meta: Meta<typeof Footer> = {
  component: Footer,
};

export default meta;

export const DefaultFooter: StoryObj<typeof Footer> = {
  name: 'Default Footer',
  render: () => <Footer />,
};
