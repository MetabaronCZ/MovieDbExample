import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { ColorId, colors } from 'modules/colors';

import { Grid } from './Grid';
import { Paragraph } from './Paragraph';
import { Ico, icoIds, icoSizes } from './Ico';

const meta: Meta<typeof Ico> = {
  component: Ico,
};

export default meta;

export const DefaultIco: StoryObj<typeof Ico> = {
  name: 'Ico variants',
  render: () => (
    <Grid orientation="vertical">
      {icoSizes.map((size) => (
        <Grid orientation="vertical" gap={1} key={size}>
          <Paragraph>size: {size}</Paragraph>
          <Grid>
            {icoIds.map((id) => (
              <Ico title={id} ico={id} size={size} key={`${size}-${id}`} />
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  ),
};

export const ColoredIco: StoryObj<typeof Ico> = {
  name: 'Ico colored',
  render: () => (
    <Grid>
      {Object.keys(colors).map((id) => (
        <Ico
          title={`color: ${id}`}
          ico="exclamationCircle"
          size="large"
          color={id as ColorId}
          key={id}
        />
      ))}
    </Grid>
  ),
};

export const SpinningIco: StoryObj<typeof Ico> = {
  name: 'Ico spinned',
  render: () => <Ico ico="spinner" size="large" spin />,
};
