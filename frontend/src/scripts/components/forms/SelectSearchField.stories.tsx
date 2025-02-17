import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { toVU } from 'modules/theme';

import { Grid } from 'components/common/Grid';
import { SelectSearchField } from './SelectSearchField';

const Container = styled(Grid)`
  max-width: ${toVU(30)};
`;

const meta: Meta<typeof SelectSearchField> = {
  component: SelectSearchField,
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
};

export default meta;

export const DefaultSelectSearchField: StoryObj<typeof SelectSearchField> = {
  name: 'SelectSearch field variants',
  render: () => (
    <Container orientation="vertical">
      <div>
        <SelectSearchField
          label="Default SelectSearch field"
          value={[{ title: 'Item A', value: 1 }]}
          options={[
            { title: 'Item A', value: 1 },
            { title: 'Item B', value: 2 },
            { title: 'Item C', value: 3 },
          ]}
          vertical
          onSelect={action('Changed!')}
          onSearch={() => Promise.resolve([])}
        />
      </div>
      <div>
        <SelectSearchField
          label="Required SelectSearch field"
          value={[{ title: 'Item A', value: 1 }]}
          options={[
            { title: 'Item A', value: 1 },
            { title: 'Item B', value: 2 },
            { title: 'Item C', value: 3 },
          ]}
          info="Form field description"
          required
          vertical
          onSelect={action('Changed!')}
          onSearch={() => Promise.resolve([])}
        />
      </div>
      <div>
        <SelectSearchField
          label="Invalid SelectSearch field"
          value={[{ title: 'Item A', value: 1 }]}
          options={[
            { title: 'Item A', value: 1 },
            { title: 'Item B', value: 2 },
            { title: 'Item C', value: 3 },
          ]}
          error="Validation error!"
          vertical
          onSelect={action('Changed!')}
          onSearch={() => Promise.resolve([])}
        />
      </div>
      <div>
        <SelectSearchField
          label="Disabled SelectSearch field"
          value={[{ title: 'Item A', value: 1 }]}
          options={[
            { title: 'Item A', value: 1 },
            { title: 'Item B', value: 2 },
            { title: 'Item C', value: 3 },
          ]}
          disabled
          vertical
          onSelect={action('Changed!')}
          onSearch={() => Promise.resolve([])}
        />
      </div>
    </Container>
  ),
};
