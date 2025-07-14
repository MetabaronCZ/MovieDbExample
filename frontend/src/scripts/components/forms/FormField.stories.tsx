import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { FormField } from './FormField';
import { Grid } from 'components/common/Grid';
import { TextField } from 'components/forms/TextField';

const meta: Meta<typeof FormField> = {
  component: FormField,
};

export default meta;

export const DefaultFormField: StoryObj<typeof FormField> = {
  name: 'FormField variants',
  render: () => (
    <Grid orientation="vertical" align="flex-start">
      <div>
        <FormField label="Default form field">CONTENT</FormField>
      </div>

      <div>
        <FormField label="Required form field" required>
          CONTENT
        </FormField>
      </div>

      <div>
        <FormField label="Invalid form field" error="Some validation error">
          CONTENT
        </FormField>
      </div>

      <div>
        <FormField label="Form field with info" info="Some info text">
          CONTENT
        </FormField>
      </div>
    </Grid>
  ),
};

export const FormFieldOrientation: StoryObj<typeof FormField> = {
  name: 'FormField orientation',
  render: () => (
    <Grid orientation="vertical" align="flex-start">
      <div>
        <FormField label="Vertical" orientation="vertical">
          <TextField value="" onChange={() => null} />
        </FormField>
      </div>

      <div>
        <FormField label="Horizontal" orientation="horizontal">
          <TextField value="" onChange={() => null} />
        </FormField>
      </div>

      <div>
        <FormField label="Reverse-horizontal" orientation="horizontal-reverse">
          <TextField value="" onChange={() => null} />
        </FormField>
      </div>

      <div>
        <FormField label="Compact" orientation="compact">
          <TextField value="" onChange={() => null} />
        </FormField>
      </div>
    </Grid>
  ),
};
