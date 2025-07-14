import {
  fireEvent,
  getAllByRole,
  getByRole,
  getByText,
  queryByRole,
} from '@testing-library/dom';
import { describe, expect, it, jest } from '@jest/globals';

import { SelectRange } from './SelectRange';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';
import { render } from '@testing-library/react';
import { act } from 'react';

describe('components/forms/SelectRange', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <SelectRange
        label="LABEL"
        from={1}
        to={8}
        values={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
        onFrom={() => null}
        onTo={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const label = getByText(container, 'LABEL');
    expect(label).toBeInTheDocument();

    const handles = getAllByRole(container, 'button');
    expect(handles.length).toEqual(2);
    expect(handles[0]).toHaveTextContent('1');
    expect(handles[1]).toHaveTextContent('8');

    // no options list opened
    const list = queryByRole(container, 'list');
    expect(list).not.toBeInTheDocument();
  });

  it('should not render when no values', async () => {
    const { container } = await waitForComponent(
      <SelectRange
        label="LABEL"
        from={1}
        to={8}
        values={[]}
        onFrom={() => null}
        onTo={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();
    expect(container.innerHTML).toEqual('');
  });

  it('should throw on invalid value', () => {
    // supress console.error
    jest.spyOn(console, 'error').mockImplementation(() => jest.fn());

    // "from" value is out of options
    const invalidFrom = (): void => {
      render(
        <SelectRange
          from={0}
          to={1}
          values={[1, 2]}
          onFrom={() => null}
          onTo={() => null}
        />,
        { wrapper: TestComponentWrapper },
      );
    };
    expect(invalidFrom).toThrow();

    // "to" value is out of options
    const invalidTo = (): void => {
      render(
        <SelectRange
          from={1}
          to={3}
          values={[1, 2]}
          onFrom={() => null}
          onTo={() => null}
        />,
        { wrapper: TestComponentWrapper },
      );
    };
    expect(invalidTo).toThrow();

    // "from" value is greater than "to" value
    const invalidRange = (): void => {
      render(
        <SelectRange
          from={2}
          to={1}
          values={[1, 2]}
          onFrom={() => null}
          onTo={() => null}
        />,
        { wrapper: TestComponentWrapper },
      );
    };
    expect(invalidRange).toThrow();

    // restore console.error supression
    jest.restoreAllMocks();
  });

  it('should render formatted values', async () => {
    const { container } = await waitForComponent(
      <SelectRange
        from={3}
        to={7}
        values={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
        formatValue={(value) => `${10 * value}%`}
        onFrom={() => null}
        onTo={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const handles = getAllByRole(container, 'button');
    expect(handles.length).toEqual(2);
    expect(handles[0]).toHaveTextContent('30%');
    expect(handles[1]).toHaveTextContent('70%');
  });

  it('should be openable / closeable', async () => {
    const { container } = await waitForComponent(
      <SelectRange
        from={1}
        to={3}
        values={[0, 1, 2, 3, 4]}
        onFrom={() => null}
        onTo={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    const handles = getAllByRole(container, 'button');
    expect(handles.length).toEqual(2);

    let list = queryByRole(container, 'list');
    expect(list).not.toBeInTheDocument();

    // open "from" Select by handle click
    act(() => {
      fireEvent.click(handles[0]);
    });
    expect(container).toMatchSnapshot();

    list = queryByRole(container, 'list');
    expect(list).toBeInTheDocument();

    if (!list) {
      throw new Error('Could not find SelectRange list of items!');
    }
    let items = getAllByRole(list, 'button');
    expect(items.length).toEqual(5);
    expect(items[0]).toHaveTextContent('0');
    expect(items[0]).not.toHaveAttribute('disabled');
    expect(items[1]).toHaveTextContent('1');
    expect(items[1]).not.toHaveAttribute('disabled');
    expect(items[2]).toHaveTextContent('2');
    expect(items[2]).not.toHaveAttribute('disabled');
    expect(items[3]).toHaveTextContent('3');
    expect(items[3]).not.toHaveAttribute('disabled');
    expect(items[4]).toHaveTextContent('4');
    expect(items[4]).toHaveAttribute('disabled');

    // close Select by Escape key
    act(() => {
      fireEvent.keyUp(document, { key: 'Escape' });
    });
    list = queryByRole(container, 'list');
    expect(list).not.toBeInTheDocument();

    // open "to" Select by handle click
    act(() => {
      fireEvent.click(handles[1]);
    });
    expect(container).toMatchSnapshot();

    list = queryByRole(container, 'list');
    expect(list).toBeInTheDocument();

    if (!list) {
      throw new Error('Could not find SelectRange list of items!');
    }
    items = getAllByRole(list, 'button');
    expect(items.length).toEqual(5);
    expect(items[0]).toHaveTextContent('0');
    expect(items[0]).toHaveAttribute('disabled');
    expect(items[1]).toHaveTextContent('1');
    expect(items[1]).not.toHaveAttribute('disabled');
    expect(items[2]).toHaveTextContent('2');
    expect(items[2]).not.toHaveAttribute('disabled');
    expect(items[3]).toHaveTextContent('3');
    expect(items[3]).not.toHaveAttribute('disabled');
    expect(items[4]).toHaveTextContent('4');
    expect(items[4]).not.toHaveAttribute('disabled');

    // close Select by Escape key
    act(() => {
      fireEvent.keyUp(document, { key: 'Escape' });
    });
    list = queryByRole(container, 'list');
    expect(list).not.toBeInTheDocument();
  });

  it('should be disabled when needed', async () => {
    const { container } = await waitForComponent(
      <SelectRange
        from={1}
        to={3}
        values={[0, 1, 2, 3, 4]}
        disabled
        onFrom={() => null}
        onTo={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    const handles = getAllByRole(container, 'button');
    expect(handles.length).toEqual(2);

    let list = queryByRole(container, 'list');
    expect(list).not.toBeInTheDocument();

    // try open "from" Select by handle click
    act(() => {
      fireEvent.click(handles[0]);
    });
    list = queryByRole(container, 'list');
    expect(list).not.toBeInTheDocument();

    // try open "to" Select by handle click
    act(() => {
      fireEvent.click(handles[1]);
    });
    list = queryByRole(container, 'list');
    expect(list).not.toBeInTheDocument();
  });

  it('should select items', async () => {
    const onFrom = jest.fn();
    const onTo = jest.fn();

    const { container } = await waitForComponent(
      <SelectRange
        from={1}
        to={3}
        values={[0, 1, 2, 3, 4]}
        onFrom={onFrom}
        onTo={onTo}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(onFrom).not.toHaveBeenCalled();
    expect(onTo).not.toHaveBeenCalled();

    const handles = getAllByRole(container, 'button');
    expect(handles.length).toEqual(2);
    expect(handles[0]).toHaveTextContent('1');
    expect(handles[1]).toHaveTextContent('3');

    // no options list opened
    let list = queryByRole(container, 'list');
    expect(list).not.toBeInTheDocument();

    // open "from" Select by handle click
    act(() => {
      fireEvent.click(handles[0]);
    });
    list = getByRole(container, 'list');
    let items = getAllByRole(list, 'button');

    // click 3rd item
    act(() => {
      fireEvent.click(items[2]);
    });
    expect(onFrom).toHaveBeenCalledTimes(1);
    expect(onFrom).toHaveBeenCalledWith(2); // 3rd item value
    expect(onTo).not.toHaveBeenCalled();

    // Select is closed after selection
    expect(queryByRole(container, 'list')).toEqual(null);

    // open "to" Select by handle click
    act(() => {
      fireEvent.click(handles[1]);
    });
    list = getByRole(container, 'list');
    items = getAllByRole(list, 'button');

    // click 5th item
    act(() => {
      fireEvent.click(items[4]);
    });
    expect(onTo).toHaveBeenCalledTimes(1);
    expect(onTo).toHaveBeenCalledWith(4); // 5th item value
    expect(onFrom).toHaveBeenCalledTimes(1); // just one previous call

    // Select is closed after selection
    expect(queryByRole(container, 'list')).toEqual(null);
  });
});
