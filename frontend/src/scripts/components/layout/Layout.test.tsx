import { getByText } from '@testing-library/dom';
import { describe, expect, it } from '@jest/globals';

import { Layout } from './Layout';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/layout/Layout', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(<Layout>CONTENT</Layout>, {
      wrapper: TestComponentWrapper,
    });
    expect(container).toMatchSnapshot();

    const content = getByText(container, 'CONTENT');
    expect(content).toBeInTheDocument();

    const main = container.getElementsByTagName('main');
    expect(main.length).toEqual(1);

    const header = container.getElementsByTagName('header');
    expect(header.length).toEqual(1);

    const footer = container.getElementsByTagName('footer');
    expect(footer.length).toEqual(1);
  });
});
