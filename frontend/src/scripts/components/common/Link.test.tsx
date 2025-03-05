import { describe, expect, it } from '@jest/globals';

import { Link } from './Link';
import { getByText } from '@testing-library/dom';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/common/Link', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(<Link to="/">CONTENT</Link>, {
      wrapper: TestComponentWrapper,
    });
    expect(container).toMatchSnapshot();

    const link = getByText(container, 'CONTENT');
    expect(link).toBeInTheDocument();
    expect(link.nodeName.toLowerCase()).toEqual('a');
  });

  it('should render props', async () => {
    const { container } = await waitForComponent(
      <Link to="/" title="TITLE" external>
        CONTENT
      </Link>,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const link = getByText(container, 'CONTENT');
    expect(link).toBeInTheDocument();

    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveAttribute('title', 'TITLE');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
