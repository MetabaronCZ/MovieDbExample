import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Footer } from 'components/layout/Footer';

const meta: Meta<typeof Footer> = {
  component: Footer,
};

export default meta;

export const DefaultFooter: StoryObj<typeof Footer> = {
  render: () => <Footer />,
};
