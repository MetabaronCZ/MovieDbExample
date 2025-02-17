import type { Meta, StoryObj } from '@storybook/react';

import { Label } from './Label';
import { Grid } from 'components/common/Grid';

const meta: Meta<typeof Label> = {
  component: Label,
};

export default meta;

export const DefaultLabel: StoryObj<typeof Label> = {
  name: 'Label variants',
  render: () => (
    <Grid orientation="vertical" align="flex-start">
      <Label label="Default label" />
      <Label label="Required label" required />
    </Grid>
  ),
};
