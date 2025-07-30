import { act } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, getByRole, getByText } from '@testing-library/dom';

import { TestComponentWrapper, waitForComponent } from 'test-utils/component';
import { SelectHandle } from 'components/forms/select/SelectHandle';

describe('components/forms/select/SelectHandle', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <SelectHandle id="ID" onClick={() => null}>
        CONTENT
      </SelectHandle>,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const ico = container.querySelector('svg');
    expect(ico).toBeInTheDocument();

    const content = getByText(container, 'CONTENT');
    expect(content).toBeInTheDocument();

    const button = getByRole(container, 'button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('id', 'ID');
    expect(button).toHaveAttribute('title', 'Otevřít');
  });

  it('should reflect closed state', async () => {
    const { container } = await waitForComponent(
      <SelectHandle onClick={() => null}>CONTENT</SelectHandle>,
      { wrapper: TestComponentWrapper },
    );
    const ico = container.querySelector('svg.fa-angle-down');
    expect(ico).toBeInTheDocument();

    const button = getByRole(container, 'button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('title', 'Otevřít');
  });

  it('should reflect opened state', async () => {
    const { container } = await waitForComponent(
      <SelectHandle opened onClick={() => null}>
        CONTENT
      </SelectHandle>,
      { wrapper: TestComponentWrapper },
    );
    const ico = container.querySelector('svg.fa-angle-up');
    expect(ico).toBeInTheDocument();

    const button = getByRole(container, 'button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('title', 'Zavřít');
  });

  it('should callback on click', async () => {
    const onClick = jest.fn();

    const { container } = await waitForComponent(
      <SelectHandle onClick={onClick}>CONTENT</SelectHandle>,
      { wrapper: TestComponentWrapper },
    );
    const button = getByRole(container, 'button');
    expect(button).toBeInTheDocument();

    expect(onClick).not.toHaveBeenCalled();

    // click on button
    act(() => {
      fireEvent.click(button);
    });

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not callback when disabled', async () => {
    const onClick = jest.fn();

    const { container } = await waitForComponent(
      <SelectHandle disabled onClick={onClick}>
        CONTENT
      </SelectHandle>,
      { wrapper: TestComponentWrapper },
    );
    const button = getByRole(container, 'button');
    expect(button).toBeInTheDocument();

    expect(onClick).not.toHaveBeenCalled();

    // click on button
    act(() => {
      fireEvent.click(button);
    });

    expect(onClick).not.toHaveBeenCalled();
  });
});
