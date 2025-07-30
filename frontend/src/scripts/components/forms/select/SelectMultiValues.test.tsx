import { act } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';
import {
  fireEvent,
  getByRole,
  getAllByRole,
  queryByRole,
  getAllByTitle,
} from '@testing-library/dom';

import { TestComponentWrapper, waitForComponent } from 'test-utils/component';
import { SelectMultiValues } from 'components/forms/select/SelectMultiValues';

describe('components/forms/select/SelectMultiValues', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <SelectMultiValues
        id="ID"
        items={[
          { title: 'Item 1', value: 1, description: 'DESC 1' },
          { title: 'Item 2', value: 2, description: 'DESC 2' },
        ]}
        onSearch={() => null}
        onRemove={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const list = getByRole(container, 'list');
    expect(list).toBeInTheDocument();

    const listItems = getAllByRole(list, 'listitem');
    expect(listItems.length).toEqual(3); // 2 value items + search input list item

    // item 1
    expect(listItems[0]).toHaveTextContent('Item 1');

    const item1Buttons = listItems[0].querySelectorAll('button');
    expect(item1Buttons.length).toEqual(2);
    expect(item1Buttons[0]).toHaveAttribute('title', 'DESC 1');
    expect(item1Buttons[1]).toHaveAttribute('title', 'Odebrat');

    // item 2
    expect(listItems[1]).toHaveTextContent('Item 2');

    const item2Buttons = listItems[1].querySelectorAll('button');
    expect(item2Buttons.length).toEqual(2);
    expect(item2Buttons[0]).toHaveAttribute('title', 'DESC 2');
    expect(item2Buttons[1]).toHaveAttribute('title', 'Odebrat');

    // search input
    const search = getByRole(listItems[2], 'textbox');
    expect(search).toBeInTheDocument();
    expect(search).toHaveAttribute('id', 'ID');
    expect(search).toHaveAttribute('placeholder', 'Hledat');
    expect(search).toHaveAttribute('value', '');
  });

  it('should render wrapped variant', async () => {
    const { container } = await waitForComponent(
      <SelectMultiValues
        items={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        wrapped
        onRemove={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();
  });

  it('should not render search input when onSearch not defined', async () => {
    const { container } = await waitForComponent(
      <SelectMultiValues
        items={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        onRemove={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const list = getByRole(container, 'list');
    expect(list).toBeInTheDocument();

    const listItems = getAllByRole(list, 'listitem');
    expect(listItems.length).toEqual(2);

    const search = queryByRole(container, 'textbox');
    expect(search).not.toBeInTheDocument();
  });

  it('should not render at all when no options and onSearch not defined', async () => {
    const { container } = await waitForComponent(
      <SelectMultiValues items={[]} onRemove={() => null} />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();
    expect(container.innerHTML).toEqual('');
  });

  it('should remove items', async () => {
    const onRemove = jest.fn();

    const { container } = await waitForComponent(
      <SelectMultiValues
        items={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        onRemove={onRemove}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(onRemove).not.toHaveBeenCalled();

    const removeButtons = getAllByTitle(container, 'Odebrat');
    expect(removeButtons.length).toEqual(2);

    // remove item 2
    act(() => {
      fireEvent.click(removeButtons[1]);
    });

    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledWith(2);
  });

  it('should not remove items when disabled', async () => {
    const onRemove = jest.fn();

    const { container } = await waitForComponent(
      <SelectMultiValues
        items={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        disabled
        onRemove={onRemove}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(onRemove).not.toHaveBeenCalled();

    const removeButtons = getAllByTitle(container, 'Odebrat');
    expect(removeButtons.length).toEqual(2);

    // remove item 2
    act(() => {
      fireEvent.click(removeButtons[1]);
    });
    expect(onRemove).not.toHaveBeenCalled();
  });

  it('should not remove disabled item', async () => {
    const onRemove = jest.fn();

    const { container } = await waitForComponent(
      <SelectMultiValues
        items={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2, disabled: true },
        ]}
        onRemove={onRemove}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(onRemove).not.toHaveBeenCalled();

    const removeButtons = getAllByTitle(container, 'Odebrat');
    expect(removeButtons.length).toEqual(2);

    // remove item 2
    act(() => {
      fireEvent.click(removeButtons[1]);
    });
    expect(onRemove).not.toHaveBeenCalled();
  });

  it('should search items', async () => {
    jest.useFakeTimers();

    const onSearch = jest.fn();

    const { container } = await waitForComponent(
      <SelectMultiValues
        items={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        onSearch={onSearch}
        onRemove={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(onSearch).not.toHaveBeenCalled();

    const search = getByRole(container, 'textbox');
    expect(search).toBeInTheDocument();

    // search query string
    act(() => {
      fireEvent.change(search, { target: { value: 'QUERY' } });
      jest.runAllTimers();
    });

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('QUERY');

    jest.useRealTimers();
  });

  it('should not search when disabled', async () => {
    jest.useFakeTimers();

    const onSearch = jest.fn();

    const { container } = await waitForComponent(
      <SelectMultiValues
        items={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        disabled
        onSearch={onSearch}
        onRemove={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(onSearch).not.toHaveBeenCalled();

    const search = getByRole(container, 'textbox');
    expect(search).toBeInTheDocument();

    // search query string
    act(() => {
      fireEvent.change(search, { target: { value: 'QUERY' } });
      jest.runAllTimers();
    });

    expect(onSearch).not.toHaveBeenCalled();

    jest.useRealTimers();
  });
});
