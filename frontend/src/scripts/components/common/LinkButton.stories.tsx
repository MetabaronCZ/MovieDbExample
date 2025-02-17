import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { Paragraph } from 'components/common/Paragraph';
import { LinkButton } from 'components/common/LinkButton';

const meta: Meta<typeof LinkButton> = {
  component: LinkButton,
};

export default meta;

export const DefaultLinkButton: StoryObj<typeof LinkButton> = {
  name: 'Default LinkButton',
  render: () => (
    <Paragraph>
      <LinkButton onClick={action('Clicked!')}>Default LinkButton</LinkButton>
    </Paragraph>
  ),
};
