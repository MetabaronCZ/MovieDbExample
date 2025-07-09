import { act } from '@testing-library/react';
import { fireEvent, getByText } from '@testing-library/dom';
import { describe, expect, it, jest } from '@jest/globals';

import { Form } from './Form';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/forms/Form', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <Form onSubmit={() => null}>CONTENT</Form>,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const form = getByText(container, 'CONTENT');
    expect(form).toBeInTheDocument();
    expect(form.tagName.toLowerCase()).toEqual('form');
  });

  it('should render loading state', async () => {
    const { container } = await waitForComponent(<Form loading>CONTENT</Form>, {
      wrapper: TestComponentWrapper,
    });
    expect(container).toMatchSnapshot();

    const form = getByText(container, 'CONTENT');
    expect(form).toBeInTheDocument();

    const wrapper = form.parentNode;
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveStyle({ opacity: 0.65 });
  });

  it('should callback submit event', async () => {
    const onSubmit = jest.fn();

    const { container } = await waitForComponent(
      <Form onSubmit={onSubmit}>
        <button type="submit">SUBMIT</button>
      </Form>,
      { wrapper: TestComponentWrapper },
    );
    expect(onSubmit).not.toHaveBeenCalled();

    const button = getByText(container, 'SUBMIT');
    expect(button).toBeInTheDocument();

    // click submit button
    act(() => {
      fireEvent.click(button);
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
