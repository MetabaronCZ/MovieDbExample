import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { TextInput } from './TextInput';
import { Grid } from 'components/common/Grid';

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
};

export default meta;

export const DefaultTextInput: StoryObj<typeof TextInput> = {
  name: 'Text input variants',
  render: () => (
    <Grid orientation="vertical" align="flex-start">
      <div>
        <TextInput value="Default text input" onChange={action('Changed!')} />
      </div>
      <div>
        <TextInput
          placeholder="Placeholder"
          value=""
          onChange={action('Changed!')}
        />
      </div>
      <div>
        <TextInput
          value="Invalid text input"
          invalid
          onChange={action('Changed!')}
        />
      </div>
      <div>
        <TextInput
          value="Disabled text input"
          disabled
          onChange={action('Changed!')}
        />
      </div>
    </Grid>
  ),
};
