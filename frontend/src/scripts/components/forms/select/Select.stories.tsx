import { FC, useMemo, useState } from 'react';
import styled from 'styled-components';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Select } from './Select';
import { Grid } from 'components/common/Grid';
import {
  SelectProps,
  SelectOption,
} from 'components/forms/select/SelectShared';

const defaultOptions: SelectOption<number>[] = [
  { title: 'Item A', value: 1 },
  { title: 'Item B', value: 2 },
  { title: 'Item C', value: 3 },
];

const Container = styled(Grid)`
  max-width: 240px;
`;

const SelectStory: FC<Partial<SelectProps<number, false>>> = (props) => {
  const [value, setValue] = useState(props.value ?? 1);

  const selectProps: SelectProps<number, false> = useMemo(
    () => ({
      options: defaultOptions,
      ...props,
      value,
      onSelect: setValue,
    }),
    [props, value],
  );
  return <Select {...selectProps} />;
};

const meta: Meta<typeof Select> = {
  component: Select,
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
};

export default meta;

export const DefaultSelect: StoryObj<typeof Select> = {
  name: 'Select variants',
  render: () => (
    <Container>
      <SelectStory />
      <SelectStory disabled />
    </Container>
  ),
};

export const AlignedSelect: StoryObj<typeof Select> = {
  name: 'Alignable select results',
  render: () => (
    <Container>
      <SelectStory
        align="right"
        options={[
          { title: 'Right aligned', value: 1 },
          { title: 'Item A', value: 2 },
          { title: 'Item B', value: 3 },
          { title: 'Item C with very long title', value: 4 },
        ]}
      />
      <SelectStory
        align="left"
        options={[
          { title: 'Left aligned', value: 1 },
          { title: 'Item A', value: 2 },
          { title: 'Item B', value: 3 },
          { title: 'Item C with very long title', value: 4 },
        ]}
      />
    </Container>
  ),
};

export const EmptySelect: StoryObj<typeof Select> = {
  name: 'Empty select',
  render: () => (
    <Container>
      <SelectStory options={[]} />
    </Container>
  ),
};
