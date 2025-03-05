import { getByText } from '@testing-library/dom';
import { describe, expect, it } from '@jest/globals';

import { Paragraph } from './Paragraph';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/common/Paragraph', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <Paragraph>CONTENT</Paragraph>,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const content = getByText(container, 'CONTENT');
    expect(content).toBeInTheDocument();

    expect(content.nodeName.toLowerCase()).toEqual('p');
  });
});
