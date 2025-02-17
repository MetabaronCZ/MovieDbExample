import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { IcoButton } from './IcoButton';
import { Grid } from 'components/common/Grid';

const meta: Meta<typeof IcoButton> = {
  component: IcoButton,
};

export default meta;

export const DefaultIcoButton: StoryObj<typeof IcoButton> = {
  name: 'IcoButton variants',
  render: () => (
    <Grid orientation="vertical">
      <div>
        <IcoButton ico="edit" icoSize="default" onClick={action('Clicked!')} />
      </div>
      <div>
        <IcoButton ico="edit" icoSize="large" onClick={action('Clicked!')} />
      </div>
      <div>
        <IcoButton ico="edit" icoSize="larger" onClick={action('Clicked!')} />
      </div>
    </Grid>
  ),
};

export const ColoredIcoButton: StoryObj<typeof IcoButton> = {
  name: 'Colored IcoButton',
  render: () => (
    <Grid>
      <div>
        <IcoButton ico="edit" color="base" onClick={action('Clicked!')} />
      </div>
      <div>
        <IcoButton ico="edit" color="active" onClick={action('Clicked!')} />
      </div>
      <div>
        <IcoButton ico="edit" color="success" onClick={action('Clicked!')} />
      </div>
      <div>
        <IcoButton ico="edit" color="error" onClick={action('Clicked!')} />
      </div>
      <div>
        <IcoButton ico="edit" color="grey" onClick={action('Clicked!')} />
      </div>
    </Grid>
  ),
};

export const DisabledtIcoButton: StoryObj<typeof IcoButton> = {
  name: 'Disabled IcoButton',
  render: () => <IcoButton ico="edit" disabled onClick={action('Clicked!')} />,
};

export const SpinIcoButton: StoryObj<typeof IcoButton> = {
  name: 'Spin IcoButton',
  render: () => (
    <IcoButton ico="spinner" icoSpin onClick={action('Clicked!')} />
  ),
};
