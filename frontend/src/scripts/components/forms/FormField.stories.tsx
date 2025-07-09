import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { FormField } from './FormField';
import { Grid } from 'components/common/Grid';

const meta: Meta<typeof FormField> = {
  component: FormField,
};

export default meta;

export const DefaultFormField: StoryObj<typeof FormField> = {
  name: 'FormField variants',
  render: () => (
    <Grid orientation="vertical">
      <FormField label="Default form field">CONTENT</FormField>

      <FormField label="Required form field" required>
        CONTENT
      </FormField>

      <FormField label="Invalid form field" error="Some validation error">
        CONTENT
      </FormField>

      <FormField label="Form field with info" info="Some info text">
        CONTENT
      </FormField>

      <FormField label="Horizontal form field" orientation="horizontal">
        CONTENT
      </FormField>

      <FormField
        label="Reverse-horizontal form field"
        orientation="horizontal-reverse"
      >
        CONTENT
      </FormField>
    </Grid>
  ),
};
