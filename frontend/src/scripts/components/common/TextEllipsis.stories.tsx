import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

import { toVU } from 'modules/theme';

import { Text } from 'components/Typography';
import { Grid } from 'components/common/Grid';
import { TextEllipsis } from 'components/common/TextEllipsis';

const meta: Meta<typeof TextEllipsis> = {
  component: TextEllipsis,
};

export default meta;

const Container = styled(Grid)`
  ${Text.Base};
  max-width: ${toVU(120)};
`;

export const DefaultTextEllipsis: StoryObj<typeof TextEllipsis> = {
  name: 'Default TextEllipsis',
  render: () => (
    <Container orientation="vertical">
      <TextEllipsis>
        <strong>Affected text:</strong> Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Vel consequatur sed, ullam eius repellendus quo
        maxime. Consequatur aliquam corporis at fugit consectetur doloribus
        adipisci incidunt nobis. Minima vel expedita quos!
      </TextEllipsis>

      <TextEllipsis>
        <strong>Unaffected text:</strong> Lorem ipsum dolor sit amet consectetur
        adipisicing elit.
      </TextEllipsis>
    </Container>
  ),
};
