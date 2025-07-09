import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Link } from './Link';
import { Paragraph } from './Paragraph';
import { Grid } from 'components/common/Grid';

const meta: Meta<typeof Link> = {
  component: Link,
};

export default meta;

export const DefaultLink: StoryObj<typeof Link> = {
  name: 'Default link',
  render: () => (
    <Grid orientation="vertical" gap={1}>
      <Paragraph>
        <Link to="/" onClick={action('Clicked!')}>
          Link variants
        </Link>
      </Paragraph>

      <Paragraph>
        <Link
          to="https://www.example.com"
          onClick={action('Clicked!')}
          external
        >
          External link
        </Link>
      </Paragraph>
    </Grid>
  ),
};
