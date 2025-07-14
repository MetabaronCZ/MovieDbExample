import { getByText } from '@testing-library/dom';
import { describe, expect, it } from '@jest/globals';

import { Label } from './Label';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/forms/Label', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <Label label="CONTENT" htmlFor="ID" />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const label = getByText(container, 'CONTENT');
    expect(label).toBeInTheDocument();
    expect(label.tagName.toLowerCase()).toEqual('label');
    expect(label).toHaveAttribute('for', 'ID');
  });

  it('should render required state', async () => {
    const { container } = await waitForComponent(
      <Label label="CONTENT" required />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const label = getByText(container, 'CONTENT');
    expect(label).toBeInTheDocument();

    const asterisk = label.querySelector('span');
    expect(asterisk).toBeInTheDocument();
  });

  it('should render compact variant', async () => {
    const { container } = await waitForComponent(
      <Label label="CONTENT" compact />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();
  });
});
