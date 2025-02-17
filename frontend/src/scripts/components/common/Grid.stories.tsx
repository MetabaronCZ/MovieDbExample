import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from './Grid';

const meta: Meta<typeof Grid> = {
  component: Grid,
};

export default meta;

export const DefaultGrid: StoryObj<typeof Grid> = {
  name: 'Horizontal grid',
  render: () => (
    <Grid orientation="horizontal">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Grid>
  ),
};

export const VerticalGrid: StoryObj<typeof Grid> = {
  name: 'Vetical grid',
  render: () => (
    <Grid orientation="vertical">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Grid>
  ),
};

export const SpacedGrid: StoryObj<typeof Grid> = {
  name: 'Grid spacing',
  render: () => (
    <Grid gap={10}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Grid>
  ),
};

export const AlignedGrid: StoryObj<typeof Grid> = {
  name: 'Grid alignment',
  render: () => (
    <Grid orientation="vertical" align="center">
      <div>Item 1</div>

      <Grid align="center">
        <div>Item 21</div>
        <div>
          Item 221
          <br />
          Item 222
        </div>
        <div>Item 23</div>
      </Grid>

      <div>Item 3</div>
    </Grid>
  ),
};

export const WrappedGrid: StoryObj<typeof Grid> = {
  name: 'Wrapped grid',
  render: () => (
    <Grid wrap>
      {Array(50)
        .fill(0)
        .map((_, i) => (
          <div key={i}>Item {i + 1}</div>
        ))}
    </Grid>
  ),
};
