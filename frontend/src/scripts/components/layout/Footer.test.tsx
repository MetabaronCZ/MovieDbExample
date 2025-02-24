import { describe, expect, it } from '@jest/globals';
import { getByText } from '@testing-library/dom';

import { Footer } from './Footer';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/layout/Footer', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(<Footer />, {
      wrapper: TestComponentWrapper,
    });
    expect(container).toMatchSnapshot();

    const footer = container.getElementsByTagName('footer');
    expect(footer.length).toEqual(1);

    const year = new Date().getFullYear();

    const copyright = getByText(container, `© ${year}`, { exact: false });
    expect(copyright).toBeInTheDocument();
  });
});
