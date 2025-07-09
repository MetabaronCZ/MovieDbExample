import styled from 'styled-components';
import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { toVU } from 'modules/theme';

import { SelectField } from './SelectField';
import { Grid } from 'components/common/Grid';

const Container = styled(Grid)`
  max-width: ${toVU(30)};
`;

const meta: Meta<typeof SelectField> = {
  component: SelectField,
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
};

export default meta;

export const DefaultSelectField: StoryObj<typeof SelectField> = {
  name: 'Select field variants',
  render: () => (
    <Container orientation="vertical">
      <div>
        <SelectField
          label="Default select field"
          value={1}
          options={[
            { title: 'Item A', value: 1 },
            { title: 'Item B', value: 2 },
            { title: 'Item C', value: 3 },
          ]}
          vertical
          onSelect={action('Changed!')}
        />
      </div>
      <div>
        <SelectField
          label="Required select field"
          value={1}
          options={[
            { title: 'Item A', value: 1 },
            { title: 'Item B', value: 2 },
            { title: 'Item C', value: 3 },
          ]}
          info="Form field description"
          required
          vertical
          onSelect={action('Changed!')}
        />
      </div>
      <div>
        <SelectField
          label="Invalid select field"
          value={1}
          options={[
            { title: 'Item A', value: 1 },
            { title: 'Item B', value: 2 },
            { title: 'Item C', value: 3 },
          ]}
          error="Validation error!"
          vertical
          onSelect={action('Changed!')}
        />
      </div>
      <div>
        <SelectField
          label="Disabled select field"
          value={1}
          options={[
            { title: 'Item A', value: 1 },
            { title: 'Item B', value: 2 },
            { title: 'Item C', value: 3 },
          ]}
          disabled
          vertical
          onSelect={action('Changed!')}
        />
      </div>
    </Container>
  ),
};

export const MultiSelectField: StoryObj<typeof SelectField> = {
  name: 'Multi select field variants',
  render: () => (
    <Container orientation="vertical">
      <div>
        <SelectField
          label="Default select field"
          value={[1]}
          options={[
            { title: 'Item A', value: 1 },
            { title: 'Item B', value: 2 },
            { title: 'Item C', value: 3 },
          ]}
          multi
          vertical
          onSelect={action('Changed!')}
        />
      </div>
      <div>
        <SelectField
          label="Required select field"
          value={[1]}
          options={[
            { title: 'Item A', value: 1 },
            { title: 'Item B', value: 2 },
            { title: 'Item C', value: 3 },
          ]}
          info="Form field description"
          multi
          required
          vertical
          onSelect={action('Changed!')}
        />
      </div>
      <div>
        <SelectField
          label="Invalid select field"
          value={[1]}
          options={[
            { title: 'Item A', value: 1 },
            { title: 'Item B', value: 2 },
            { title: 'Item C', value: 3 },
          ]}
          error="Validation error!"
          multi
          vertical
          onSelect={action('Changed!')}
        />
      </div>
      <div>
        <SelectField
          label="Disabled select field"
          value={[1]}
          options={[
            { title: 'Item A', value: 1 },
            { title: 'Item B', value: 2 },
            { title: 'Item C', value: 3 },
          ]}
          multi
          disabled
          vertical
          onSelect={action('Changed!')}
        />
      </div>
    </Container>
  ),
};
