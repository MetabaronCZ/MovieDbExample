import { act } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';
import {
  fireEvent,
  getAllByRole,
  getByRole,
  getByTestId,
  getByText,
  getByTitle,
  queryByTestId,
} from '@testing-library/dom';

import { SelectSearch } from 'components/forms/select/SelectSearch';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

// mock Loader component
jest.mock('../../common/Loader.tsx', () => ({
  Loader: () => <div data-testid="loader-mock" />,
}));

describe('components/forms/select/SelectSearch', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <SelectSearch
        id="ID"
        value={[{ title: 'Item 1', value: 1 }]}
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        onSelect={() => null}
        onSearch={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const list = getByRole(container, 'list');
    expect(list).toBeInTheDocument();

    const listItems = getAllByRole(list, 'listitem');
    expect(listItems.length).toEqual(2);

    // selected items
    const selectedItemButton = getByText(listItems[0], 'Item 1');
    expect(selectedItemButton).toBeInTheDocument();
    expect(selectedItemButton.nodeName.toLowerCase()).toEqual('button');

    const selectedItemClearButton = getByTitle(listItems[0], 'Odebrat');
    expect(selectedItemClearButton).toBeInTheDocument();
    expect(selectedItemClearButton.nodeName.toLowerCase()).toEqual('button');

    // search input
    const search = getByRole(listItems[1], 'textbox');
    expect(search).toBeInTheDocument();
    expect(search).toHaveAttribute('id', 'ID');
    expect(search).toHaveAttribute('value', '');
    expect(search).toHaveAttribute('placeholder', 'Hledat');

    // clear selection button
    const clearButton = list.nextSibling;
    expect(clearButton).toBeInTheDocument();
    expect(clearButton?.nodeName.toLowerCase()).toEqual('button');
    expect(clearButton).toHaveAttribute('title', 'Zrušit');
  });

  it('should render empty-value variant', async () => {
    const { container } = await waitForComponent(
      <SelectSearch
        value={[]}
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        onSelect={() => null}
        onSearch={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const list = getByRole(container, 'list');
    expect(list).toBeInTheDocument();

    const listItems = getAllByRole(list, 'listitem');
    expect(listItems.length).toEqual(1);

    // search input
    const search = getByRole(listItems[0], 'textbox');
    expect(search).toBeInTheDocument();

    // no selection >> no clear button
    const clearButton = list.nextSibling;
    expect(clearButton).not.toBeInTheDocument();
  });

  it('should render empty-options variant', async () => {
    const { container } = await waitForComponent(
      <SelectSearch
        value={[]}
        options={[]}
        onSelect={() => null}
        onSearch={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const list = getByRole(container, 'list');
    expect(list).toBeInTheDocument();

    const listItems = getAllByRole(list, 'listitem');
    expect(listItems.length).toEqual(1);

    // search input
    const search = getByRole(listItems[0], 'textbox');
    expect(search).toBeInTheDocument();

    // no selection >> no clear button
    const clearButton = list.nextSibling;
    expect(clearButton).not.toBeInTheDocument();
  });

  it('should clear selected item', async () => {
    const onSelect = jest.fn();

    const { container } = await waitForComponent(
      <SelectSearch
        value={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        onSelect={onSelect}
        onSearch={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(onSelect).not.toHaveBeenCalled();

    const list = getByRole(container, 'list');
    expect(list).toBeInTheDocument();

    const listItems = getAllByRole(list, 'listitem');
    expect(listItems.length).toEqual(3); // 2 items + search input

    // click Item 1 clear button
    const item1Clear = listItems[0].querySelectorAll('button')[1];

    act(() => {
      fireEvent.click(item1Clear);
    });
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith([2]); // array of item IDs left

    // click Item 2 clear button
    const item2Clear = listItems[1].querySelectorAll('button')[1];

    act(() => {
      fireEvent.click(item2Clear);
    });
    expect(onSelect).toHaveBeenCalledTimes(2);
    expect(onSelect).toHaveBeenCalledWith([1]); // array of item IDs left
  });

  it('should not clear selected item if disabled', async () => {
    const onSelect = jest.fn();

    const { container } = await waitForComponent(
      <SelectSearch
        value={[{ title: 'Item 1', value: 1, disabled: true }]}
        options={[{ title: 'Item 1', value: 1 }]}
        onSelect={onSelect}
        onSearch={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(onSelect).not.toHaveBeenCalled();

    const list = getByRole(container, 'list');
    expect(list).toBeInTheDocument();

    const listItems = getAllByRole(list, 'listitem');
    expect(listItems.length).toEqual(2); // selected item + search input

    // click Item 1 clear button
    const item1Clear = listItems[0].querySelectorAll('button')[1];

    act(() => {
      fireEvent.click(item1Clear);
    });
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('should clear all selected items', async () => {
    const onSelect = jest.fn();

    const { container } = await waitForComponent(
      <SelectSearch
        value={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        onSelect={onSelect}
        onSearch={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(onSelect).not.toHaveBeenCalled();

    const list = getByRole(container, 'list');
    expect(list).toBeInTheDocument();

    const listItems = getAllByRole(list, 'listitem');
    expect(listItems.length).toEqual(3); // 2 items + search input

    // clear all selected button
    const clearButton = list.nextSibling;

    if (!clearButton) {
      throw new Error('Clear button not found!');
    }
    act(() => {
      fireEvent.click(clearButton);
    });
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith([]);
  });

  it('should not clear selected items when disabled', async () => {
    const onSelect = jest.fn();

    const { container } = await waitForComponent(
      <SelectSearch
        value={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        disabled
        onSelect={onSelect}
        onSearch={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(onSelect).not.toHaveBeenCalled();

    const list = getByRole(container, 'list');
    expect(list).toBeInTheDocument();

    const listItems = getAllByRole(list, 'listitem');
    expect(listItems.length).toEqual(3); // 2 items + search input

    // clear all selected button
    const clearButton = list.nextSibling;

    if (!clearButton) {
      throw new Error('Clear button not found!');
    }
    act(() => {
      fireEvent.click(clearButton);
    });
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('should be searchable', async () => {
    jest.useFakeTimers();

    const onSearch = jest.fn();
    const onSelect = jest.fn();

    const { container } = await waitForComponent(
      <SelectSearch
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
    expect(lists.length).toEqual(1);

    const listItems = getAllByRole(container, 'listitem');
    expect(listItems.length).toEqual(1); // search input only

    const search = getByRole(listItems[0], 'textbox');
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

    // close result by clicking Escape key
    act(() => {
      fireEvent.keyUp(document, { key: 'Escape' });
    });
    lists = getAllByRole(container, 'list');
    expect(lists.length).toEqual(1);

    jest.useRealTimers();
  });

  it('should not search / open when disabled', async () => {
    jest.useFakeTimers();

    const onSearch = jest.fn();
    const onSelect = jest.fn();

    const { container } = await waitForComponent(
      <SelectSearch
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

    const listItems = getAllByRole(container, 'listitem');
    expect(listItems.length).toEqual(1); // search input only

    const search = getByRole(listItems[0], 'textbox');
    expect(search).toBeInTheDocument();
    expect(search).toHaveAttribute('disabled');

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

  it('should reflect loading state', async () => {
    jest.useFakeTimers();

    const { container } = await waitForComponent(
      <SelectSearch
        value={[]}
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        loading
        onSelect={() => null}
        onSearch={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );

    // no Loader / results closed
    let loader = queryByTestId(container, 'loader-mock');
    expect(loader).not.toBeInTheDocument();

    // search input
    const search = getByRole(container, 'textbox');
    expect(search).toBeInTheDocument();

    // search query string
    act(() => {
      fireEvent.change(search, { target: { value: 'QUERY' } });
      jest.runAllTimers();
    });

    // Loader present
    loader = getByTestId(container, 'loader-mock');
    expect(loader).toBeInTheDocument();

    jest.useRealTimers();
  });
});
