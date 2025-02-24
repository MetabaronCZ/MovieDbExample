import { act } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, getByRole } from '@testing-library/dom';

import { Button } from './Button';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/button/Button', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <Button text="CONTENT" onClick={() => null} />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const button = getByRole(container, 'button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('CONTENT');
  });

  it('should render basic props', async () => {
    const { container } = await waitForComponent(
      <Button
        type="submit"
        id="ID"
        className="CLASSNAME"
        text="CONTENT"
        disabled
        onClick={() => null}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const button = getByRole(container, 'button');
    expect(button).toBeInTheDocument();

    expect(button).toHaveAttribute('id', 'ID');
    expect(button).toHaveClass('CLASSNAME');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('disabled', '');
    expect(button).toHaveTextContent('CONTENT');
  });

  it('should render ico before', async () => {
    const { container } = await waitForComponent(
      <Button text="CONTENT" icoBefore="cross" onClick={() => null} />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const button = getByRole(container, 'button');
    expect(button).toBeInTheDocument();

    const ico = button.querySelector('svg.fa-xmark');
    expect(ico).toBeInTheDocument();
  });

  it('should render ico after', async () => {
    const { container } = await waitForComponent(
      <Button text="CONTENT" icoAfter="cross" onClick={() => null} />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const button = getByRole(container, 'button');
    expect(button).toBeInTheDocument();

    const ico = button.querySelector('svg.fa-xmark');
    expect(ico).toBeInTheDocument();
  });

  it('should be clickable', async () => {
    const onClick = jest.fn();

    const { container } = await waitForComponent(
      <Button text="CONTENT" onClick={onClick} />,
      { wrapper: TestComponentWrapper },
    );
    expect(onClick).not.toBeCalled();

    const button = getByRole(container, 'button');
    expect(button).toBeInTheDocument();

    // click on button
    act(() => {
      fireEvent.click(button);
    });
    expect(onClick).toBeCalledTimes(1);
  });

  it('should not be clickable when disabled', async () => {
    const onClick = jest.fn();

    const { container } = await waitForComponent(
      <Button text="CONTENT" onClick={onClick} disabled />,
      { wrapper: TestComponentWrapper },
    );
    expect(onClick).not.toBeCalled();

    const button = getByRole(container, 'button');
    expect(button).toBeInTheDocument();

    // click on button
    act(() => {
      fireEvent.click(button);
    });
    expect(onClick).not.toBeCalled();
  });
});
