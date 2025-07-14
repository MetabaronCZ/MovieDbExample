import { FC, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Grid } from 'components/common/Grid';
import { SelectRange, SelectRangeProps } from 'components/forms/SelectRange';

const values = Array(10)
  .fill(0)
  .map((_, i) => i + 1);

const SelectRangeStory: FC<Partial<SelectRangeProps>> = (props) => {
  const [from, onFrom] = useState(props.from ?? values[2]);
  const [to, onTo] = useState(props.to ?? values[values.length - 3]);

  const rangeProps: SelectRangeProps = useMemo(
    () => ({
      values,
      ...props,
      from,
      to,
      onFrom,
      onTo,
    }),
    [props, from, to],
  );
  return <SelectRange {...rangeProps} />;
};

const meta: Meta<typeof SelectRange> = {
  component: SelectRange,
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
};

export default meta;

export const DefaultSelectRange: StoryObj<typeof SelectRange> = {
  name: 'SelectRange variants',
  render: () => (
    <Grid orientation="vertical">
      <SelectRangeStory label="Default SelectRange" />
      <SelectRangeStory label="Disabled SelectRange" disabled />
    </Grid>
  ),
};

export const FormattedSelectRange: StoryObj<typeof SelectRange> = {
  name: 'Formatted SelectRange',
  render: () => (
    <SelectRangeStory
      label="Formatted SelectRange"
      formatValue={(value) => `${(10 * value).toFixed(1)}%`}
    />
  ),
};

export const EmptySelectRange: StoryObj<typeof SelectRange> = {
  name: 'Empty SelectRange',
  render: () => <SelectRangeStory label="Empty SelectRange" values={[]} />,
};
