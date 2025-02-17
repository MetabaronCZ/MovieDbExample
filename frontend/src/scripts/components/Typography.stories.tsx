import styled, { RuleSet } from 'styled-components';
import type { Meta, StoryObj } from '@storybook/react';

import { toVU } from 'modules/theme';
import { colors } from 'modules/colors';

import { Text } from './Typography';
import { Grid } from './common/Grid';
import { getObjectEntries } from 'modules/core';

interface StyledProps {
  readonly $styles: RuleSet;
}

const FontComponent = styled.p<StyledProps>`
  ${({ $styles }) => $styles};
`;

const ColorComponent = styled.div`
  width: ${toVU(4)};
  height: ${toVU(4)};
  border: 2px solid black;
`;

const meta: Meta = {
  /* */
};

export default meta;

export const FontVariants: StoryObj = {
  name: 'Font variants',
  render: () => (
    <Grid orientation="vertical">
      {getObjectEntries(Text).map(([id, styles]) => (
        <FontComponent $styles={styles} key={id}>
          {id}
        </FontComponent>
      ))}
    </Grid>
  ),
};

export const Colors: StoryObj = {
  render: () => (
    <Grid>
      {getObjectEntries(colors).map(([id, color]) => (
        <ColorComponent title={id} style={{ background: color }} key={id} />
      ))}
    </Grid>
  ),
};
