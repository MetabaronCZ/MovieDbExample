import type { Meta, StoryObj } from '@storybook/react-webpack5';

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
      <Label label="Compact label" compact />
      <Label label="Required Compact label" compact required />
    </Grid>
  ),
};
