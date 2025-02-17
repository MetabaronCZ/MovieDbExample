import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from './TextField';
import { Grid } from 'components/common/Grid';

const meta: Meta<typeof TextField> = {
  component: TextField,
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
};

export default meta;

export const DefaultTextField: StoryObj<typeof TextField> = {
  name: 'Text input field variants',
  render: () => (
    <Grid orientation="vertical" align="flex-start">
      <div>
        <TextField
          label="Default text input field"
          value="lorem ipsum..."
          onChange={action('Changed!')}
        />
      </div>
      <div>
        <TextField
          label="Required text input field"
          value="lorem ipsum..."
          info="Form field description"
          required
          onChange={action('Changed!')}
        />
      </div>
      <div>
        <TextField
          label="Invalid text input field"
          value="lorem ipsum..."
          error="Validation error!"
          onChange={action('Changed!')}
        />
      </div>
      <div>
        <TextField
          label="Disabled text input field"
          value="lorem ipsum..."
          disabled
          onChange={action('Changed!')}
        />
      </div>
    </Grid>
  ),
};
