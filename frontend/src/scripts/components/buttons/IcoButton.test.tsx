import { act } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, getByRole } from '@testing-library/dom';

import { IcoButton } from './IcoButton';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/button/Button', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <IcoButton ico="cross" onClick={() => null} />,
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
      <IcoButton ico="cross" onClick={onClick} />,
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
      <IcoButton ico="cross" onClick={onClick} disabled />,
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
