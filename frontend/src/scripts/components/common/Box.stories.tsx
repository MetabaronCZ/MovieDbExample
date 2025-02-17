import type { Meta, StoryObj } from '@storybook/react';

import { Box } from './Box';
import { Paragraph } from './Paragraph';

const meta: Meta<typeof Box> = {
  component: Box,
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
};

export default meta;

export const DefaultBox: StoryObj<typeof Box> = {
  name: 'Default box',
  render: () => (
    <Box>
      <Paragraph>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut vel nam sed
        porro quas. Enim omnis dolorem est, adipisci, aut voluptatum modi ipsum
        dolores consectetur harum doloremque illo! Eligendi, voluptate.
      </Paragraph>

      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        exercitationem quasi asperiores blanditiis perferendis quo modi quod hic
        esse amet. Quaerat beatae laborum obcaecati nemo aperiam optio fugit,
        error quidem.
      </Paragraph>
    </Box>
  ),
};
