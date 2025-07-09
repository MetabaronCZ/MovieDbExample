import styled from 'styled-components';
import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { toVU } from 'modules/theme';

import { Grid } from 'components/common/Grid';
import { TextareaField } from './TextareaField';

const Container = styled(Grid)`
  max-width: ${toVU(60)};
`;

const meta: Meta<typeof TextareaField> = {
  component: TextareaField,
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
};

export default meta;

export const DefaultTextareaField: StoryObj<typeof TextareaField> = {
  name: 'Textarea field variants',
  render: () => (
    <Container orientation="vertical">
      <div>
        <TextareaField
          label="Default textarea field"
          value="lorem ipsum..."
          onChange={action('Changed!')}
        />
      </div>
      <div>
        <TextareaField
          label="Required textarea field"
          value="lorem ipsum..."
          info="Form field description"
          required
          onChange={action('Changed!')}
        />
      </div>
      <div>
        <TextareaField
          label="Invalid textarea field"
          value="lorem ipsum..."
          error="Validation error!"
          onChange={action('Changed!')}
        />
      </div>
      <div>
        <TextareaField
          label="Disabled textarea field"
          value="lorem ipsum..."
          disabled
          onChange={action('Changed!')}
        />
      </div>
    </Container>
  ),
};
