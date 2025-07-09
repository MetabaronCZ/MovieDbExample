import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { ButtonLink } from './ButtonLink';
import { Grid } from 'components/common/Grid';

const meta: Meta<typeof ButtonLink> = {
  component: ButtonLink,
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
};

export default meta;

export const DefaultButtonLink: StoryObj<typeof ButtonLink> = {
  name: 'ButtonLink variants',
  render: () => <ButtonLink text="Default button link" to="#test" />,
};

export const ButtonLinkWithIco: StoryObj<typeof ButtonLink> = {
  name: 'ButtonLink with ico',
  render: () => (
    <Grid>
      <ButtonLink icoBefore="angleLeft" text="Ico before" to="#test" />
      <ButtonLink icoAfter="angleRight" text="Ico after" to="#test" />
      <ButtonLink icoAfter="spinner" text="Ico spin" icoSpin to="#to" />
    </Grid>
  ),
};

export const IcoButtonLink: StoryObj<typeof ButtonLink> = {
  name: 'Ico ButtonLink',
  render: () => <ButtonLink ico="sortAscending" to="#test" />,
};
