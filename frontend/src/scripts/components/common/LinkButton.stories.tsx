import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

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
