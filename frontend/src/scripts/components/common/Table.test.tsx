import { fireEvent, getByText, queryByText } from '@testing-library/dom';
import { describe, expect, it, jest } from '@jest/globals';

import { Table } from 'components/common/Table';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';
import { act } from '@testing-library/react';

interface TableData {
  readonly x: string;
  readonly y: number;
}

describe('components/common/Table', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <Table<TableData>
        columns={{
          x: { title: 'Column X', render: (value) => value },
          y: { title: 'Column Y', render: (value) => value },
        }}
        data={[
          { x: 'Value A', y: 112 },
          { x: 'Value B', y: 212 },
          { x: 'Value C', y: 312 },
        ]}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const column1 = getByText(container, 'Column X');
    expect(column1).toBeInTheDocument();
    const column2 = getByText(container, 'Column Y');
    expect(column2).toBeInTheDocument();

    const value1 = getByText(container, 'Value A');
    expect(value1).toBeInTheDocument();
    const value2 = getByText(container, 'Value B');
    expect(value2).toBeInTheDocument();
    const value3 = getByText(container, 'Value C');
    expect(value3).toBeInTheDocument();

    const value4 = getByText(container, '112');
    expect(value4).toBeInTheDocument();
    const value5 = getByText(container, '212');
    expect(value5).toBeInTheDocument();
    const value6 = getByText(container, '312');
    expect(value6).toBeInTheDocument();
  });

  it('should render error state', async () => {
    const { container } = await waitForComponent(
      <Table<TableData>
        error="Some error message!"
        columns={{
          x: { title: 'Column X', render: (value) => value },
          y: { title: 'Column Y', render: (value) => value },
        }}
        data={[{ x: 'Value A', y: 112 }]}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const column1 = getByText(container, 'Column X');
    expect(column1).toBeInTheDocument();
    const column2 = getByText(container, 'Column Y');
    expect(column2).toBeInTheDocument();

    const someValue = queryByText(container, 'Value A');
    expect(someValue).not.toBeInTheDocument();

    const error = getByText(container, 'Some error message!');
    expect(error).toBeInTheDocument();
  });

  it('should render loading state', async () => {
    const { container } = await waitForComponent(
      <Table<TableData>
        isLoading
        columns={{
          x: { title: 'Column X', render: (value) => value },
          y: { title: 'Column Y', render: (value) => value },
        }}
        data={[{ x: 'Value A', y: 112 }]}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const column1 = getByText(container, 'Column X');
    expect(column1).toBeInTheDocument();
    const column2 = getByText(container, 'Column Y');
    expect(column2).toBeInTheDocument();

    const someValue = getByText(container, 'Value A');
    expect(someValue).toBeInTheDocument();

    const content = container.childNodes[0];
    expect(content).toHaveStyle({ opacity: '0.65' });
  });

  it('should render formatted values', async () => {
    const { container } = await waitForComponent(
      <Table<TableData>
        columns={{
          x: { title: 'Column X', render: (value) => `-${value}-` },
          y: { title: 'Column Y', render: (value) => 10 * value },
        }}
        data={[{ x: 'Value A', y: 112 }]}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const value1 = getByText(container, '-Value A-');
    expect(value1).toBeInTheDocument();

    const value2 = getByText(container, '1120');
    expect(value2).toBeInTheDocument();
  });

  it('should sort data', async () => {
    const onSort = jest.fn();

    const { container } = await waitForComponent(
      <Table<TableData>
        columns={{
          x: { title: 'Column X', sort: true, render: (value) => value },
          y: { title: 'Column Y', sort: true, render: (value) => value },
        }}
        data={[
          { x: 'Value A', y: 112 },
          { x: 'Value B', y: 212 },
          { x: 'Value C', y: 312 },
        ]}
        sort="x"
        sortDirection="ascending"
        onSort={onSort}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();
    expect(onSort).not.toBeCalled();

    const header1 = getByText(container, 'Column X');
    expect(header1).toBeInTheDocument();

    const header2 = getByText(container, 'Column Y');
    expect(header2).toBeInTheDocument();

    const button1 = header1.closest('button');
    const button2 = header2.closest('button');

    act(() => {
      if (button1) {
        fireEvent.click(button1);
      }
    });
    expect(onSort).toBeCalledTimes(1);
    expect(onSort).toBeCalledWith('x', 'descending');

    act(() => {
      if (button2) {
        fireEvent.click(button2);
      }
    });
    expect(onSort).toBeCalledTimes(2);
    expect(onSort).toBeCalledWith('y', 'ascending');
  });
});
