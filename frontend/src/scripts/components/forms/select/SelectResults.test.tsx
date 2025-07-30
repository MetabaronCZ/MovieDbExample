import { act } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';
import {
  fireEvent,
  getAllByRole,
  getByRole,
  getByTestId,
  queryByRole,
} from '@testing-library/dom';

import { SelectResults } from 'components/forms/select/SelectResults';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

// mock Loader component
jest.mock('../../common/Loader.tsx', () => ({
  Loader: () => <div data-testid="loader-mock" />,
}));

describe('components/forms/select/SelectResults', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <SelectResults
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

    const items = getAllByRole(container, 'listitem');
    expect(items.length).toEqual(2);
    expect(items[0]).toHaveTextContent('Item 1');
    expect(items[1]).toHaveTextContent('Item 2');
  });

  it('should render result item props', async () => {
    const { container } = await waitForComponent(
      <SelectResults
        options={[
          {
            title: 'Item',
            value: 101,
            extra: <sub>EXTRA</sub>,
            description: 'DESCRIPTION',
            disabled: true,
          },
        ]}
        onSelect={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const item = getByRole(container, 'listitem');
    expect(item).toBeInTheDocument();

    const button = item.querySelector('button');
    expect(button).toBeInTheDocument();

    expect(button).toHaveAttribute('title', 'DESCRIPTION');
    expect(button).toHaveAttribute('disabled');
    expect(button).toHaveTextContent('ItemEXTRA');
  });

  it('should render empty options', async () => {
    const { container } = await waitForComponent(
      <SelectResults options={[]} onSelect={() => null} />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent('Nebyla nalezena žádná data.');

    const list = queryByRole(container, 'list');
    expect(list).not.toBeInTheDocument();
  });

  it('should render left-aligned variant', async () => {
    const { container } = await waitForComponent(
      <SelectResults
        align="left"
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        onSelect={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render right-aligned variant', async () => {
    const { container } = await waitForComponent(
      <SelectResults
        align="right"
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        onSelect={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render loading state', async () => {
    const { container } = await waitForComponent(
      <SelectResults
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        loading
        onSelect={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent('');

    const list = queryByRole(container, 'list');
    expect(list).not.toBeInTheDocument();

    // Loader present
    const loader = getByTestId(container, 'loader-mock');
    expect(loader).toBeInTheDocument();
  });

  it('should select items', async () => {
    const onSelect = jest.fn();

    const { container } = await waitForComponent(
      <SelectResults
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        onSelect={onSelect}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(onSelect).not.toHaveBeenCalled();

    const list = getByRole(container, 'list');
    const items = getAllByRole(list, 'button');

    // click Item 2
    act(() => {
      fireEvent.click(items[1]);
    });
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(2); // Item 2 value
  });

  it('should not select disabled item', async () => {
    const onSelect = jest.fn();

    const { container } = await waitForComponent(
      <SelectResults
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2, disabled: true },
        ]}
        onSelect={onSelect}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(onSelect).not.toHaveBeenCalled();

    const list = getByRole(container, 'list');
    const items = getAllByRole(list, 'button');

    // click Item 2
    act(() => {
      fireEvent.click(items[1]);
    });
    expect(onSelect).not.toHaveBeenCalled();
  });
});
