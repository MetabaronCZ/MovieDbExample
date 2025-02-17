import type { Meta, StoryObj } from '@storybook/react';

import { Heading } from './Heading';
import { Grid } from './Grid';

const meta: Meta<typeof Heading> = {
  component: Heading,
};

export default meta;

export const DefaultHeading: StoryObj<typeof Heading> = {
  name: 'Heading variants',
  render: () => (
    <Grid orientation="vertical">
      <Heading size="default">Heading default</Heading>
      <Heading size="large">Heading large</Heading>
    </Grid>
  ),
};
