import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { Grid } from 'components/common/Grid';

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
};

export default meta;

export const DefaultButton: StoryObj<typeof Button> = {
  name: 'Default Button',
  render: () => <Button text="Button" onClick={action('Clicked!')} />,
};

export const DisabledtButton: StoryObj<typeof Button> = {
  name: 'Disabled button',
  render: () => <Button text="Primary" disabled onClick={action('Clicked!')} />,
};

export const ButtonWithIco: StoryObj<typeof Button> = {
  name: 'Button with ico',
  render: () => (
    <Grid>
      <Button
        icoBefore="angleLeft"
        text="Ico before"
        onClick={action('Clicked!')}
      />
      <Button
        icoAfter="angleRight"
        text="Ico after"
        onClick={action('Clicked!')}
      />
      <Button
        icoAfter="spinner"
        text="Ico spin"
        icoSpin
        onClick={action('Clicked!')}
      />
    </Grid>
  ),
};

export const IcoButtonStory: StoryObj<typeof Button> = {
  name: 'Ico button',
  render: () => <Button ico="sortAscending" onClick={action('Clicked!')} />,
};
