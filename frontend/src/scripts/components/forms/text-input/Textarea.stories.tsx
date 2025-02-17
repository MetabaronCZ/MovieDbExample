import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { toVU } from 'modules/theme';

import { Textarea } from './Textarea';
import { Grid } from 'components/common/Grid';

const Container = styled(Grid)`
  max-width: ${toVU(60)};
`;

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  parameters: {
    backgrounds: {
      default: 'Light',
    },
  },
};

export default meta;

export const DefaultTextarea: StoryObj<typeof Textarea> = {
  name: 'Textarea variants',
  render: () => (
    <Container orientation="vertical">
      <div>
        <Textarea value="Default textarea" onChange={action('Changed!')} />
      </div>
      <div>
        <Textarea
          placeholder="Placeholder"
          value=""
          onChange={action('Changed!')}
        />
      </div>
      <div>
        <Textarea
          value="Invalid textarea"
          invalid
          onChange={action('Changed!')}
        />
      </div>
      <div>
        <Textarea
          value="Disabled textarea"
          disabled
          onChange={action('Changed!')}
        />
      </div>
    </Container>
  ),
};

export const TextareaHeight: StoryObj<typeof Textarea> = {
  name: 'Textarea with height',
  render: () => (
    <Container orientation="vertical">
      <Textarea
        value="Textarea with height"
        height={18}
        onChange={action('Changed!')}
      />
      <Textarea
        value="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum nulla nihil ducimus! Expedita, debitis! Quae sed commodi, et natus aperiam laudantium asperiores sequi modi dicta. Unde amet sint architecto delectus? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, natus aperiam distinctio odit tempora sed repellendus? Doloribus autem nobis, laborum delectus impedit vel, totam tempora non ipsa unde ab suscipit."
        height={18}
        onChange={action('Changed!')}
      />
    </Container>
  ),
};
