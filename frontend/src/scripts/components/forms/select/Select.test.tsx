import { act, render } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';
import {
  fireEvent,
  getAllByRole,
  getByRole,
  queryByRole,
} from '@testing-library/dom';

import { Select } from './Select';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/forms/Select', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <Select
        value={1}
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        onSelect={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    // handle is present
    const handle = getByRole(container, 'button');
    expect(handle).toBeInTheDocument();
    expect(handle).toHaveTextContent('Item 1');

    // list is not opened
    const list = queryByRole(container, 'list');
    expect(list).not.toBeInTheDocument();
  });

  it('should not render when no options', async () => {
    const { container } = await waitForComponent(
      <Select value={1} options={[]} onSelect={() => null} />,
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
        <Select
          value={100}
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
      <Select
        value={1}
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        onSelect={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    const handle = getByRole(container, 'button');
    expect(handle).toBeInTheDocument();

    let list = queryByRole(container, 'list');
    expect(list).not.toBeInTheDocument();

    // open Select by handle click
    act(() => {
      fireEvent.click(handle);
    });
    expect(container).toMatchSnapshot();

    list = queryByRole(container, 'list');
    expect(list).toBeInTheDocument();

    if (!list) {
      throw new Error('Could not find Select list of items!');
    }
    const items = getAllByRole(list, 'button');
    expect(items.length).toEqual(2);
    expect(items[0]).toHaveTextContent('Item 1');
    expect(items[1]).toHaveTextContent('Item 2');

    // close Select by Escape key
    act(() => {
      fireEvent.keyUp(document, { key: 'Escape' });
    });
    list = queryByRole(container, 'list');
    expect(list).not.toBeInTheDocument();
  });

  it('should select items', async () => {
    const onSelect = jest.fn();

    const { container } = await waitForComponent(
      <Select
        value={1}
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        onSelect={onSelect}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(onSelect).not.toBeCalled();

    const handle = getByRole(container, 'button');
    expect(handle).toHaveTextContent('Item 1'); // Item 1 selected

    // open Select by handle click
    act(() => {
      fireEvent.click(handle);
    });
    const list = getByRole(container, 'list');
    const items = getAllByRole(list, 'button');

    // click Item 2
    act(() => {
      fireEvent.click(items[1]);
    });
    expect(onSelect).toBeCalledTimes(1);
    expect(onSelect).toBeCalledWith(2); // Item 2 value

    // Select is closed after selection
    expect(queryByRole(container, 'list')).toEqual(null);
  });
});
