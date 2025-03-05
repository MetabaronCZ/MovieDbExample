import { getByText } from '@testing-library/dom';
import { describe, expect, it } from '@jest/globals';

import { Box } from 'components/common/Box';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/common/Box', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(<Box>CONTENT</Box>, {
      wrapper: TestComponentWrapper,
    });
    expect(container).toMatchSnapshot();

    const content = getByText(container, 'CONTENT');
    expect(content).toBeInTheDocument();
  });
});
