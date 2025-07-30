import { act } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';
import {
  fireEvent,
  getAllByRole,
  getByRole,
  getByText,
  queryByRole,
} from '@testing-library/dom';

import { SelectField } from 'components/forms/SelectField';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/forms/SelectField', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <SelectField
        id="ID"
        label="LABEL"
        value={1}
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        required
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

    const select = getByRole(container, 'button');
    expect(select).toHaveAttribute('id', 'ID');
    expect(select).toHaveTextContent('Item 1');
  });

  it('should render multi-select variant', async () => {
    const { container } = await waitForComponent(
      <SelectField
        id="ID"
        label="LABEL"
        value={[]}
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        multi
        onSelect={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const label = getByText(container, 'LABEL');
    expect(label).toBeInTheDocument();

    const select = getByRole(container, 'button');
    expect(select).toHaveAttribute('id', 'ID');
    expect(select).toHaveTextContent('- vyberte -');
  });

  it('should render error', async () => {
    const { container } = await waitForComponent(
      <SelectField
        label="LABEL"
        error="SOME-ERROR"
        value="VALUE"
        options={[]}
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
      <SelectField
        label="LABEL"
        info="SOME-INFO"
        value="VALUE"
        options={[]}
        onSelect={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const info = getByText(container, 'SOME-INFO');
    expect(info).toBeInTheDocument();
  });

  it('should be able to change value', async () => {
    const onSelect = jest.fn();

    const { container } = await waitForComponent(
      <SelectField
        label="LABEL"
        value={1}
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        onSelect={onSelect}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(onSelect).not.toHaveBeenCalled();

    const handle = getByRole(container, 'button');
    expect(handle).toBeInTheDocument();

    let list = queryByRole(container, 'list');
    expect(list).not.toBeInTheDocument();

    // open Select by handle click
    act(() => {
      fireEvent.click(handle);
    });

    list = getByRole(container, 'list');
    expect(list).toBeInTheDocument();

    const items = getAllByRole(list, 'button');
    expect(items.length).toEqual(2);

    // click Item 2
    act(() => {
      fireEvent.click(items[1]);
    });
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(2); // Item 2 value

    // Select is closed after selection
    list = queryByRole(container, 'list');
    expect(list).not.toBeInTheDocument();
  });

  it('should not open when disabled', async () => {
    const { container } = await waitForComponent(
      <SelectField
        label="LABEL"
        value={1}
        options={[
          { title: 'Item 1', value: 1 },
          { title: 'Item 2', value: 2 },
        ]}
        disabled
        onSelect={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    const handle = getByRole(container, 'button');
    expect(handle).toBeInTheDocument();

    let list = queryByRole(container, 'list');
    expect(list).not.toBeInTheDocument();

    // try open Select by handle click
    act(() => {
      fireEvent.click(handle);
    });

    list = queryByRole(container, 'list');
    expect(list).not.toBeInTheDocument();
  });
});
