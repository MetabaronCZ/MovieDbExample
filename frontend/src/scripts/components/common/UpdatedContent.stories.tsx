import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Paragraph } from './Paragraph';
import { UpdatedContent } from './UpdatedContent';

const meta: Meta = {
  /* */
};

export default meta;

export const DefaultUpdatedContent: StoryObj = {
  name: 'Updated content loading state',
  render: () => (
    <UpdatedContent loading>
      <Paragraph>
        Suscipit ipsam porro dignissimos molestias consectetur laborum quas
        deleniti alias. Aspernatur eum repudiandae autem nam, commodi fugiat
        dolorem dicta corporis ea molestias excepturi, recusandae repellat quam
        asperiores, voluptatem provident tenetur!
      </Paragraph>
    </UpdatedContent>
  ),
};

export const LoadedUpdatedContent: StoryObj = {
  name: 'Updated content loaded state',
  render: () => (
    <UpdatedContent>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo nihil
        dicta, culpa iste nesciunt esse delectus ab consequuntur, minima non
        doloremque, dolore corrupti laborum ex cum praesentium adipisci dolorem
        deleniti?
      </Paragraph>
    </UpdatedContent>
  ),
};
