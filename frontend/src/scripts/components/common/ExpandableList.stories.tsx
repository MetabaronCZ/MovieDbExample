import type { Meta, StoryObj } from '@storybook/react';

import { ExpandableList } from 'components/common/ExpandableList';

const meta: Meta<typeof ExpandableList> = {
  component: ExpandableList,
};

export default meta;

export const DefaultExpandableList: StoryObj<typeof ExpandableList> = {
  name: 'Default ExpandableList',
  render: () => (
    <ExpandableList
      values={[{ title: 'Item A' }, { title: 'Item B' }, { title: 'Item C' }]}
    />
  ),
};

export const LinksExpandableList: StoryObj<typeof ExpandableList> = {
  name: 'ExpandableList with links',
  render: () => (
    <ExpandableList
      values={[
        { title: 'Item A', url: '/item-a' },
        { title: 'Item B', url: '/item-b' },
      ]}
    />
  ),
};

export const ShortExpandableList: StoryObj<typeof ExpandableList> = {
  name: 'Short ExpandableList ',
  render: () => <ExpandableList values={[{ title: 'Item A' }]} />,
};

export const EmptyExpandableList: StoryObj<typeof ExpandableList> = {
  name: 'Empty ExpandableList',
  render: () => <ExpandableList values={[]} />,
};
