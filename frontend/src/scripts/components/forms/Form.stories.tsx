import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Form } from './Form';

const meta: Meta<typeof Form> = {
  component: Form,
};

export default meta;

export const DefaultForm: StoryObj<typeof Form> = {
  name: 'Default form',
  render: () => (
    <Form onSubmit={action('Submit!')}>
      <input placeholder="Text field..." />
    </Form>
  ),
};

export const LoadingForm: StoryObj<typeof Form> = {
  name: 'Loading form',
  render: () => (
    <Form loading onSubmit={action('Submit!')}>
      <input placeholder="Text field..." />
    </Form>
  ),
};
