import { act } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, getByRole } from '@testing-library/dom';

import { TextInput } from './TextInput';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/forms/TextInput', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <TextInput value="TEXT" onChange={() => null} />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const input = getByRole(container, 'textbox');
    expect(input).toBeInTheDocument();
    expect(input.tagName.toLowerCase()).toEqual('input');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('value', 'TEXT');
  });

  it('should render basic props', async () => {
    const { container } = await waitForComponent(
      <TextInput
        id="ID"
        value="TEXT"
        placeholder="PLACEHOLDER"
        disabled
        maxLength={120}
        onChange={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const input = getByRole(container, 'textbox');
    expect(input).toHaveAttribute('id', 'ID');
    expect(input).toHaveAttribute('value', 'TEXT');
    expect(input).toHaveAttribute('placeholder', 'PLACEHOLDER');
    expect(input).toHaveAttribute('disabled', '');
    expect(input).toHaveAttribute('maxlength', '120');
  });

  it('should be able to autofocus', async () => {
    const { container } = await waitForComponent(
      <TextInput value="TEXT" autoFocus onChange={() => null} />,
      { wrapper: TestComponentWrapper },
    );
    const input = getByRole(container, 'textbox');
    expect(input).toHaveFocus();
  });

  it('should be able to change value', async () => {
    const onChange = jest.fn();

    const { container } = await waitForComponent(
      <TextInput value="" onChange={onChange} />,
      { wrapper: TestComponentWrapper },
    );
    expect(onChange).not.toBeCalled();

    const input = getByRole(container, 'textbox');
    expect(input).toHaveAttribute('value', '');

    // type some text
    act(() => {
      fireEvent.change(input, { target: { value: 'TEXT' } });
    });

    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith('TEXT');
  });

  it('should be disabled', async () => {
    const onChange = jest.fn();

    const { container } = await waitForComponent(
      <TextInput value="TEXT" autoFocus disabled onChange={onChange} />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();
    expect(onChange).not.toBeCalled();

    const input = getByRole(container, 'textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('value', 'TEXT');
    expect(input).toHaveAttribute('disabled', '');
    expect(input).not.toHaveFocus(); // no autofocus when disabled

    // type some text
    act(() => {
      fireEvent.change(input, { target: { value: 'NEW_TEXT' } });
    });

    expect(onChange).not.toBeCalled();
  });
});
