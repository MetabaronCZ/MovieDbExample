import { act } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, getByRole, getByText } from '@testing-library/dom';

import { TextareaField } from 'components/forms/TextareaField';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/forms/TextareaField', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <TextareaField
        id="ID"
        label="LABEL"
        placeholder="PLACEHOLDER"
        name="NAME"
        value="VALUE"
        height={1}
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

    const textarea = getByRole(container, 'textbox');
    expect(textarea).toHaveAttribute('id', 'ID');
    expect(textarea).toHaveTextContent('VALUE');
    expect(textarea).toHaveAttribute('placeholder', 'PLACEHOLDER');
    expect(textarea).toHaveAttribute('name', 'NAME');
    expect(textarea).toHaveAttribute('maxlength', '100');
    expect(textarea).toHaveStyle({ height: 'calc(16px)' });
  });

  it('should render error', async () => {
    const { container } = await waitForComponent(
      <TextareaField
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
      <TextareaField
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
      <TextareaField label="LABEL" value="" onChange={onChange} />,
      { wrapper: TestComponentWrapper },
    );
    expect(onChange).not.toHaveBeenCalled();

    const textarea = getByRole(container, 'textbox');
    expect(textarea).toHaveTextContent('');

    // type some text
    act(() => {
      fireEvent.change(textarea, { target: { value: 'TEXT' } });
    });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('TEXT');
  });

  it('should not change value when disabled', async () => {
    const onChange = jest.fn();

    const { container } = await waitForComponent(
      <TextareaField label="LABEL" value="" disabled onChange={onChange} />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();
    expect(onChange).not.toHaveBeenCalled();

    const textarea = getByRole(container, 'textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('disabled', '');

    // type some text
    act(() => {
      fireEvent.change(textarea, { target: { value: 'NEW_TEXT' } });
    });

    expect(onChange).not.toHaveBeenCalled();
  });
});
