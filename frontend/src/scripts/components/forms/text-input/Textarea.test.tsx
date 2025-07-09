import { act } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, getByRole } from '@testing-library/dom';

import { Textarea } from './Textarea';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/forms/Textarea', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <Textarea value="TEXT" onChange={() => null} />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const textarea = getByRole(container, 'textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName.toLowerCase()).toEqual('textarea');
    expect(textarea).toHaveValue('TEXT');
  });

  it('should render basic props', async () => {
    const { container } = await waitForComponent(
      <Textarea
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

    const textarea = getByRole(container, 'textbox');
    expect(textarea).toHaveAttribute('id', 'ID');
    expect(textarea).toHaveValue('TEXT');
    expect(textarea).toHaveAttribute('placeholder', 'PLACEHOLDER');
    expect(textarea).toHaveAttribute('disabled', '');
    expect(textarea).toHaveAttribute('maxlength', '120');
  });

  it('should be able to autofocus', async () => {
    const { container } = await waitForComponent(
      <Textarea value="TEXT" autoFocus onChange={() => null} />,
      { wrapper: TestComponentWrapper },
    );
    const textarea = getByRole(container, 'textbox');
    expect(textarea).toHaveFocus();
  });

  it('should be able to change value', async () => {
    const onChange = jest.fn();

    const { container } = await waitForComponent(
      <Textarea value="" onChange={onChange} />,
      { wrapper: TestComponentWrapper },
    );
    expect(onChange).not.toHaveBeenCalled();

    const textarea = getByRole(container, 'textbox');
    expect(textarea).toHaveValue('');

    // type some text
    act(() => {
      fireEvent.change(textarea, { target: { value: 'TEXT' } });
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('TEXT');
  });

  it('should be disabled', async () => {
    const onChange = jest.fn();

    const { container } = await waitForComponent(
      <Textarea value="TEXT" autoFocus disabled onChange={onChange} />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();
    expect(onChange).not.toHaveBeenCalled();

    const textarea = getByRole(container, 'textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('disabled', '');
    expect(textarea).not.toHaveFocus(); // no autofocus when disabled

    // type some text
    act(() => {
      fireEvent.change(textarea, { target: { value: 'NEW_TEXT' } });
    });

    expect(onChange).not.toHaveBeenCalled();
  });
});
