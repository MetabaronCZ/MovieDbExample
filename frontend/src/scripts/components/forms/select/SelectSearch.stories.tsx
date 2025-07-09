import { FC, useMemo, useState } from 'react';
import styled from 'styled-components';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Grid } from 'components/common/Grid';
import { SelectSearch } from './SelectSearch';
import {
  SelectProps,
  SelectOption,
  SelectSearchProps,
} from 'components/forms/select/SelectShared';

const defaultOptions: SelectOption<number>[] = [
  { title: 'Item A', value: 1 },
  { title: 'Item B', value: 2 },
  { title: 'Item C', value: 3 },
];

const Container = styled(Grid)`
  max-width: 240px;
`;

type StoryProps = Omit<SelectProps<number, true>, 'value'> &
  SelectSearchProps<number>;

const SelectSearchStory: FC<Partial<StoryProps>> = (props) => {
  const [value, setValue] = useState(props.value ?? []);

  const selectProps: StoryProps = useMemo(
    () => ({
      ...props,
      value,
      options: defaultOptions,
      onSearch: () => Promise.resolve(defaultOptions),
      onSelect: (selected) => {
        const values = defaultOptions.filter((item) => {
          return selected.includes(item.value);
        });
        setValue(values);
      },
    }),
    [props, value],
  );
  return <SelectSearch {...selectProps} />;
};

const meta: Meta<typeof SelectSearch> = {
  component: SelectSearch,
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
};

export default meta;

export const DefaultSelectSearch: StoryObj<typeof SelectSearch> = {
  name: 'SelectSearch variants',
  render: () => (
    <Container orientation="vertical">
      <SelectSearchStory value={defaultOptions.slice(0, 1)} />
      <SelectSearchStory value={defaultOptions.slice(0, 1)} disabled />
    </Container>
  ),
};

export const AlignedSelectSearch: StoryObj<typeof SelectSearch> = {
  name: 'Alignable SelectSearch results',
  render: () => (
    <Container orientation="vertical">
      <SelectSearchStory align="right" value={defaultOptions.slice(0, 1)} />
      <SelectSearchStory align="left" value={defaultOptions.slice(0, 1)} />
    </Container>
  ),
};

export const EmptySelectSearch: StoryObj<typeof SelectSearch> = {
  name: 'Empty SelectSearch',
  render: () => (
    <Container>
      <SelectSearchStory options={[]} />
    </Container>
  ),
};
