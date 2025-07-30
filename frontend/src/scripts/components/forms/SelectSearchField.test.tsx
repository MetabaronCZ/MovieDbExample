import { act } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';
import {
  fireEvent,
  getAllByRole,
  getByRole,
  getByText,
} from '@testing-library/dom';

import { SelectSearchField } from 'components/forms/SelectSearchField';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/forms/SelectSearchField', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <SelectSearchField
        id="ID"
        label="LABEL"
        value={[{ title: 'Item 1', value: 1 }]}
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        required
        onSearch={() => null}
        onSelect={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const label = getByText(container, 'LABEL');
    expect(label).toBeInTheDocument();
    expect(label.tagName.toLowerCase()).toEqual('label');
    expect(label).toHaveAttribute('for', 'ID');

    const required = label.querySelector('span');
    expect(required).toBeInTheDocument();

    const list = getByRole(container, 'list');
    expect(list).toBeInTheDocument();

    const listItems = getAllByRole(list, 'listitem');
    expect(listItems.length).toEqual(2);

    const selectedItem = getByText(listItems[0], 'Item 1');
    expect(selectedItem).toBeInTheDocument();

    // search input
    const search = getByRole(listItems[1], 'textbox');
    expect(search).toBeInTheDocument();
    expect(search).toHaveAttribute('id', 'ID');

    // clear selection button
    const clearButton = list.nextSibling;
    expect(clearButton).toBeInTheDocument();
  });

  it('should render error', async () => {
    const { container } = await waitForComponent(
      <SelectSearchField
        label="LABEL"
        error="SOME-ERROR"
        value={[]}
        options={[]}
        onSearch={() => null}
        onSelect={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const error = getByText(container, 'SOME-ERROR');
    expect(error).toBeInTheDocument();
  });

  it('should render info text', async () => {
    const { container } = await waitForComponent(
      <SelectSearchField
        label="LABEL"
        info="SOME-INFO"
        value={[]}
        options={[]}
        onSearch={() => null}
        onSelect={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const info = getByText(container, 'SOME-INFO');
    expect(info).toBeInTheDocument();
  });

  it('should be searchable', async () => {
    jest.useFakeTimers();

    const onSearch = jest.fn();
    const onSelect = jest.fn();

    const { container } = await waitForComponent(
      <SelectSearchField
        label="LABEL"
        value={[]}
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        onSelect={onSelect}
        onSearch={onSearch}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(onSelect).not.toHaveBeenCalled();
    expect(onSearch).not.toHaveBeenCalled();

    let lists = getAllByRole(container, 'list');
    expect(lists.length).toEqual(1); // search input only

    const search = getByRole(container, 'textbox');
    expect(search).toBeInTheDocument();

    // search query string
    act(() => {
      fireEvent.change(search, { target: { value: 'QUERY' } });
      jest.runAllTimers();
    });

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('QUERY');

    // result list should be opened
    lists = getAllByRole(container, 'list');
    expect(lists.length).toEqual(2);

    const results = getAllByRole(lists[1], 'listitem');
    expect(results.length).toEqual(2);
    expect(results[0]).toHaveTextContent('Item 1');
    expect(results[1]).toHaveTextContent('Item 2');

    // select Item 2
    const item2Button = getByRole(results[1], 'button');

    act(() => {
      fireEvent.click(item2Button);
    });
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith([2]);

    // results should be still opened for further selection
    lists = getAllByRole(container, 'list');
    expect(lists.length).toEqual(2);

    // select Item 1
    const item1Button = getByRole(results[0], 'button');

    act(() => {
      fireEvent.click(item1Button);
    });
    expect(onSelect).toHaveBeenCalledTimes(2);
    expect(onSelect).toHaveBeenCalledWith([1]);

    jest.useRealTimers();
  });

  it('should not search / open when disabled', async () => {
    jest.useFakeTimers();

    const onSearch = jest.fn();
    const onSelect = jest.fn();

    const { container } = await waitForComponent(
      <SelectSearchField
        label="LABEL"
        value={[]}
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        disabled
        onSelect={onSelect}
        onSearch={onSearch}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(onSelect).not.toHaveBeenCalled();
    expect(onSearch).not.toHaveBeenCalled();

    let lists = getAllByRole(container, 'list');
    expect(lists.length).toEqual(1);

    const search = getByRole(container, 'textbox');
    expect(search).toBeInTheDocument();

    // try search query string
    act(() => {
      fireEvent.change(search, { target: { value: 'QUERY' } });
      jest.runAllTimers();
    });
    expect(onSearch).not.toHaveBeenCalled();

    // result list should not be opened
    lists = getAllByRole(container, 'list');
    expect(lists.length).toEqual(1);
  });
});
