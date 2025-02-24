import { describe, expect, it } from '@jest/globals';
import { getByRole, getByText } from '@testing-library/dom';

import { Content } from './Content';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/layout/Content', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(<Content>CONTENT</Content>, {
      wrapper: TestComponentWrapper,
    });
    expect(container).toMatchSnapshot();

    const content = getByText(container, 'CONTENT');
    expect(content).toBeInTheDocument();

    const main = getByRole(container, 'main');
    expect(main).toBeInTheDocument();
  });
});
