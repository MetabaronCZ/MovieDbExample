import { act } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, getByRole } from '@testing-library/dom';

import { LinkButton } from './LinkButton';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/common/LinkButton', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <LinkButton onClick={() => null}>CONTENT</LinkButton>,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const button = getByRole(container, 'button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('CONTENT');
  });

  it('should render basic props', async () => {
    const { container } = await waitForComponent(
      <LinkButton id="ID" className="CLASSNAME" onClick={() => null}>
        CONTENT
      </LinkButton>,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const button = getByRole(container, 'button');
    expect(button).toBeInTheDocument();

    expect(button).toHaveAttribute('id', 'ID');
    expect(button).toHaveClass('CLASSNAME');
    expect(button).toHaveTextContent('CONTENT');
  });

  it('should be clickable', async () => {
    const onClick = jest.fn();

    const { container } = await waitForComponent(
      <LinkButton onClick={onClick}>CONTENT</LinkButton>,
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
});
