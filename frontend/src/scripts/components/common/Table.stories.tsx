import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Table } from './Table';

const meta: Meta<typeof Table> = {
  component: Table,
};

export default meta;

export const DefaultTable: StoryObj<typeof Table> = {
  name: 'Default table',
  render: () => (
    <Table
      data={[
        {
          name: 'C',
          count: 0,
          extra: null,
        },
        {
          name: 'A',
          count: 10,
          extra: null,
        },
        {
          name: 'B',
          count: 9,
          extra: null,
        },
      ]}
      columns={{
        name: {
          title: 'String column',
          sort: true,
          render: (value) => value,
        },
        count: {
          title: 'Number column',
          align: 'center',
          sort: true,
          render: (value) => value,
        },
        extra: {
          title: 'Empty column',
          width: '128px',
          align: 'flex-end',
          render: () => '-',
        },
      }}
      sort="name"
      sortDirection="ascending"
      onSort={action('Sort"')}
    />
  ),
};

export const LoadingTable: StoryObj<typeof Table> = {
  name: 'Table loading',
  render: () => (
    <Table
      data={[
        {
          name: 'C',
          count: 0,
        },
        {
          name: 'A',
          count: 10,
        },
        {
          name: 'B',
          count: 9,
        },
      ]}
      columns={{
        name: {
          title: 'String column',
          render: (value) => value,
        },
        count: {
          title: 'Number column',
          align: 'center',
          render: (value) => value,
        },
      }}
      isLoading
    />
  ),
};

export const ErrorTable: StoryObj<typeof Table> = {
  name: 'Table error',
  render: () => (
    <Table
      data={[
        {
          name: 'C',
          count: 0,
        },
        {
          name: 'A',
          count: 10,
        },
        {
          name: 'B',
          count: 9,
        },
      ]}
      columns={{
        name: {
          title: 'String column',
          render: (value) => value,
        },
        count: {
          title: 'Number column',
          align: 'center',
          render: (value) => value,
        },
      }}
      error="Some table data error"
    />
  ),
};
