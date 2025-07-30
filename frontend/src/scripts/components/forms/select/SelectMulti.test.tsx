import { act, render } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';
import {
  fireEvent,
  getByRole,
  getByTitle,
  getAllByRole,
} from '@testing-library/dom';

import { SelectMulti } from './SelectMulti';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/forms/select/SelectMulti', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <SelectMulti
        value={[1]}
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        onSelect={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const list = getByRole(container, 'list');
    expect(list).toBeInTheDocument();

    const listItems = getAllByRole(list, 'button');
    expect(listItems.length).toEqual(2);

    const selectedItem = listItems[0];
    expect(selectedItem.textContent).toEqual('Item 1');
    expect(selectedItem.nodeName.toLowerCase()).toEqual('button');

    const clearSelectedItem = listItems[1];
    expect(clearSelectedItem.title).toEqual('Odebrat');
    expect(clearSelectedItem.nodeName.toLowerCase()).toEqual('button');

    const clearAllItems = getByTitle(container, 'Odebrat');
    expect(clearAllItems).toBeInTheDocument();
    expect(clearAllItems.nodeName.toLowerCase()).toEqual('button');

    const openButton = getByTitle(container, 'Otevřít');
    expect(openButton).toBeInTheDocument();
    expect(openButton.nodeName.toLowerCase()).toEqual('button');
  });

  it('should not render when no options', async () => {
    const { container } = await waitForComponent(
      <SelectMulti value={[]} options={[]} onSelect={() => null} />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();
    expect(container.innerHTML).toEqual('');
  });

  it('should throw on invalid value', () => {
    // supress console.error
    jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

    const action = (): void => {
      render(
        <SelectMulti
          value={[100]}
          options={[{ title: 'Item 1', value: 1 }]}
          onSelect={() => null}
        />,
        { wrapper: TestComponentWrapper },
      );
    };
    expect(action).toThrow();

    // restore console.error supression
    jest.restoreAllMocks();
  });

  it('should be openable / closeable', async () => {
    const { container } = await waitForComponent(
      <SelectMulti
        value={[1]}
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        onSelect={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    const handle = getByTitle(container, 'Otevřít');
    expect(handle).toBeInTheDocument();

    let list = getAllByRole(container, 'list');
    expect(list.length).toEqual(1);

    // open Select by handle click
    act(() => {
      fireEvent.click(handle);
    });
    expect(container).toMatchSnapshot();

    list = getAllByRole(container, 'list');
    expect(list.length).toEqual(2);

    const selectableItems = getAllByRole(list[1], 'button');
    expect(selectableItems.length).toEqual(1);
    expect(selectableItems[0]).toHaveTextContent('Item 2');

    // close Select by Escape key
    act(() => {
      fireEvent.keyUp(document, { key: 'Escape' });
    });
    list = getAllByRole(container, 'list');
    expect(list.length).toEqual(1);
  });

  it('should not open when disabled', async () => {
    const { container } = await waitForComponent(
      <SelectMulti
        value={[1]}
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        disabled
        onSelect={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    const handle = getByTitle(container, 'Otevřít');
    expect(handle).toBeInTheDocument();

    let list = getAllByRole(container, 'list');
    expect(list.length).toEqual(1);

    // try open Select by handle click
    act(() => {
      fireEvent.click(handle);
    });

    list = getAllByRole(container, 'list');
    expect(list.length).toEqual(1);
  });

  it('should select items', async () => {
    const onSelect = jest.fn();

    const { container } = await waitForComponent(
      <SelectMulti
        value={[1]}
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        onSelect={onSelect}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(onSelect).not.toHaveBeenCalled();

    const handle = getByTitle(container, 'Otevřít');

    let list = getAllByRole(container, 'list');
    expect(list.length).toEqual(1);

    const selected = getAllByRole(list[0], 'listitem');
    expect(selected.length).toEqual(1);
    expect(selected[0].textContent).toEqual('Item 1');

    // open Select by handle click
    act(() => {
      fireEvent.click(handle);
    });
    list = getAllByRole(container, 'list');
    expect(list.length).toEqual(2);

    const selectableItems = getAllByRole(list[1], 'button');
    expect(selectableItems.length).toEqual(1);
    expect(selectableItems[0]).toHaveTextContent('Item 2');

    // click Item 2
    act(() => {
      fireEvent.click(selectableItems[0]);
    });
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith([1, 2]); // Item 1 + Item 2 values

    // Select is still opened for next selection
    list = getAllByRole(container, 'list');
    expect(list.length).toEqual(2);
  });

  it('should not select disabled item', async () => {
    const onSelect = jest.fn();

    const { container } = await waitForComponent(
      <SelectMulti
        value={[1]}
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2, disabled: true },
        ]}
        onSelect={onSelect}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(onSelect).not.toHaveBeenCalled();

    const handle = getByTitle(container, 'Otevřít');

    let list = getAllByRole(container, 'list');
    expect(list.length).toEqual(1);

    const selected = getAllByRole(list[0], 'listitem');
    expect(selected.length).toEqual(1);
    expect(selected[0].textContent).toEqual('Item 1');

    // open Select by handle click
    act(() => {
      fireEvent.click(handle);
    });
    expect(container).toMatchSnapshot();

    list = getAllByRole(container, 'list');
    expect(list.length).toEqual(2);

    const selectableItems = getAllByRole(list[1], 'button');
    expect(selectableItems.length).toEqual(1);
    expect(selectableItems[0]).toHaveTextContent('Item 2');

    // click Item 2
    act(() => {
      fireEvent.click(selectableItems[0]);
    });
    expect(onSelect).not.toHaveBeenCalled();

    // Select is still opened
    list = getAllByRole(container, 'list');
    expect(list.length).toEqual(2);
  });
});
