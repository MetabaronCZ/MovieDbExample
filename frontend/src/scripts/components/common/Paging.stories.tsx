import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Paging } from './Paging';
import { usePaging } from 'hooks/usePaging';

const meta: Meta<typeof Paging> = {
  component: Paging,
};

export default meta;

interface PagingTemplateProps {
  readonly totalCount: number;
}

const PagingTemplate: React.FC<PagingTemplateProps> = ({ totalCount }) => {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(3);

  const paging = usePaging({
    totalCount,
    page,
    perPage,
    perPages: [3, 5, 10],
    onPage: (page, perPage) => {
      setPage(page);
      setPerPage(perPage);
      return Promise.resolve();
    },
    onPerPage: (perPage) => {
      setPerPage(perPage);
      return Promise.resolve();
    },
  });
  return <Paging paging={paging} />;
};

export const DefaultPaging: StoryObj<typeof Paging> = {
  name: 'Default paging',
  render: () => <PagingTemplate totalCount={10} />,
};

export const OnePagePaging: StoryObj<typeof Paging> = {
  name: 'One page paging',
  render: () => <PagingTemplate totalCount={1} />,
};
