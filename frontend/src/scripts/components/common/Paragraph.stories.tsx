import type { Meta, StoryObj } from '@storybook/react';

import { Paragraph } from './Paragraph';

const meta: Meta<typeof Paragraph> = {
  component: Paragraph,
};

export default meta;

export const DefaultParagraph: StoryObj<typeof Paragraph> = {
  name: 'Default paragraph',
  render: () => (
    <Paragraph>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel consequatur
      sed, ullam eius repellendus quo maxime. Consequatur aliquam corporis at
      fugit consectetur doloribus adipisci incidunt nobis. Minima vel expedita
      quos!
    </Paragraph>
  ),
};
