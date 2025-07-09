import { FC, useMemo, useState } from 'react';
import styled from 'styled-components';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { SelectMulti } from './SelectMulti';
import { Grid } from 'components/common/Grid';
import {
  SelectOption,
  SelectProps,
} from 'components/forms/select/SelectShared';

const defaultOptions: SelectOption<number>[] = [
  { title: 'Item A', value: 1 },
  { title: 'Item B', value: 2 },
  { title: 'Item C', value: 3 },
];

const Container = styled(Grid)`
  max-width: 400px;
`;

const SelectMultiStory: FC<Partial<SelectProps<number, true>>> = (props) => {
  const [value, setValue] = useState(props.value ?? [1]);

  const selectProps: SelectProps<number, true> = useMemo(
    () => ({
      options: defaultOptions,
      ...props,
      value,
      onSelect: setValue,
    }),
    [props, value],
  );
  return <SelectMulti {...selectProps} />;
};

const meta: Meta<typeof SelectMulti> = {
  component: SelectMulti,
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
};

export default meta;

export const DefaultSelectMulti: StoryObj<typeof SelectMulti> = {
  name: 'Multi select variants',
  render: () => (
    <Container orientation="vertical">
      <SelectMultiStory />
      <SelectMultiStory disabled />
    </Container>
  ),
};

export const AlignedSelectMulti: StoryObj<typeof SelectMulti> = {
  name: 'Alignable multi select results',
  render: () => (
    <Container orientation="vertical">
      <SelectMultiStory
        align="right"
        options={[
          { title: 'Right aligned', value: 1 },
          { title: 'Item A', value: 2 },
          { title: 'Item B', value: 3 },
          { title: 'Item C with very long title', value: 4 },
        ]}
      />
      <SelectMultiStory
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
