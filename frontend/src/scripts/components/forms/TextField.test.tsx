import { act } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, getByRole, getByText } from '@testing-library/dom';

import { TextField } from 'components/forms/TextField';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/forms/TextField', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <TextField
        id="ID"
        label="LABEL"
        placeholder="PLACEHOLDER"
        name="NAME"
        value="VALUE"
        min={1}
        max={10}
        step={5}
        maxLength={100}
        required
        onChange={() => null}
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

    const input = getByRole(container, 'textbox');
    expect(input).toHaveAttribute('id', 'ID');
    expect(input).toHaveAttribute('value', 'VALUE');
    expect(input).toHaveAttribute('placeholder', 'PLACEHOLDER');
    expect(input).toHaveAttribute('name', 'NAME');
    expect(input).toHaveAttribute('min', '1');
    expect(input).toHaveAttribute('max', '10');
    expect(input).toHaveAttribute('step', '5');
    expect(input).toHaveAttribute('maxlength', '100');
  });

  it('should render error', async () => {
    const { container } = await waitForComponent(
      <TextField
        label="LABEL"
        error="SOME-ERROR"
        value="VALUE"
        onChange={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const error = getByText(container, 'SOME-ERROR');
    expect(error).toBeInTheDocument();
  });

  it('should render info text', async () => {
    const { container } = await waitForComponent(
      <TextField
        label="LABEL"
        info="SOME-INFO"
        value="VALUE"
        onChange={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const info = getByText(container, 'SOME-INFO');
    expect(info).toBeInTheDocument();
  });

  it('should be able to change value', async () => {
    const onChange = jest.fn();

    const { container } = await waitForComponent(
      <TextField label="LABEL" value="" onChange={onChange} />,
      { wrapper: TestComponentWrapper },
    );
    expect(onChange).not.toHaveBeenCalled();

    const input = getByRole(container, 'textbox');
    expect(input).toHaveAttribute('value', '');

    // type some text
    act(() => {
      fireEvent.change(input, { target: { value: 'TEXT' } });
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('TEXT');
  });

  it('should not change value when disabled', async () => {
    const onChange = jest.fn();

    const { container } = await waitForComponent(
      <TextField label="LABEL" value="" disabled onChange={onChange} />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();
    expect(onChange).not.toHaveBeenCalled();

    const input = getByRole(container, 'textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('disabled', '');

    // type some text
    act(() => {
      fireEvent.change(input, { target: { value: 'NEW_TEXT' } });
    });

    expect(onChange).not.toHaveBeenCalled();
  });
});
