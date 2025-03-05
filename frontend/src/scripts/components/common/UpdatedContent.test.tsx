import { getByText } from '@testing-library/dom';
import { describe, expect, it } from '@jest/globals';

import { UpdatedContent } from 'components/common/UpdatedContent';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/common/UpdatedContent', () => {
  it('should render standardcontent when not loading', async () => {
    const { container } = await waitForComponent(
      <UpdatedContent>CONTENT</UpdatedContent>,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const content = getByText(container, 'CONTENT');
    expect(content).toBeInTheDocument();

    expect(content).toHaveStyle({ opacity: '' });
  });

  it('should render faded content when loading', async () => {
    const { container } = await waitForComponent(
      <UpdatedContent loading>CONTENT</UpdatedContent>,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const content = getByText(container, 'CONTENT');
    expect(content).toBeInTheDocument();

    expect(content).not.toHaveStyle({ opacity: '' });
  });
});
