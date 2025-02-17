import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from './Grid';
import { Infobox } from './Infobox';

const meta: Meta<typeof Infobox> = {
  component: Infobox,
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
};

export default meta;

export const DefaultInfobox: StoryObj<typeof Infobox> = {
  name: 'Infobox variants',
  render: () => (
    <Grid orientation="vertical">
      <Infobox type="info">
        Info: Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
        voluptatibus tempora tempore.
      </Infobox>

      <Infobox type="success">
        Success: Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Nulla, aut, et quia nisi adipisci tenetur voluptas laudantium magnam.
      </Infobox>

      <Infobox type="error">
        Error: Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Dignissimos, mollitia in.
      </Infobox>
    </Grid>
  ),
};
