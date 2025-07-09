import { act } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, getByRole, getByText } from '@testing-library/dom';

import { ButtonRaw } from './ButtonRaw';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/button/ButtonRaw', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <ButtonRaw>CONTENT</ButtonRaw>,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const button = getByText(container, 'CONTENT');
    expect(button).toBeInTheDocument();
    expect(button.tagName.toLowerCase()).toEqual('button');
  });

  it('should render props', async () => {
    const { container } = await waitForComponent(
      <ButtonRaw
        id="ID"
        className="CLASSNAME"
        title="TITLE"
        type="submit"
        disabled
      >
        CONTENT
      </ButtonRaw>,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const button = getByText(container, 'CONTENT');
    expect(button).toBeInTheDocument();

    expect(button).toHaveAttribute('id', 'ID');
    expect(button).toHaveClass('CLASSNAME');
    expect(button).toHaveAttribute('title', 'TITLE');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('disabled', '');
  });

  it('should be clickable', async () => {
    const onClick = jest.fn();

    const { container } = await waitForComponent(
      <ButtonRaw onClick={onClick}>CONTENT</ButtonRaw>,
      { wrapper: TestComponentWrapper },
    );
    expect(onClick).not.toHaveBeenCalled();

    const button = getByRole(container, 'button');
    expect(button).toBeInTheDocument();

    // click on button
    act(() => {
      fireEvent.click(button);
    });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not be clickable when disabled', async () => {
    const onClick = jest.fn();

    const { container } = await waitForComponent(
      <ButtonRaw onClick={onClick} disabled>
        CONTENT
      </ButtonRaw>,
      { wrapper: TestComponentWrapper },
    );
    expect(onClick).not.toHaveBeenCalled();

    const button = getByRole(container, 'button');
    expect(button).toBeInTheDocument();

    // click on button
    act(() => {
      fireEvent.click(button);
    });
    expect(onClick).not.toHaveBeenCalled();
  });
});
