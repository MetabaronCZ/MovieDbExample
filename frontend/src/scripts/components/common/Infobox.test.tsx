import { getByText } from '@testing-library/dom';
import { describe, expect, it } from '@jest/globals';

import { Infobox } from './Infobox';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/common/Infobox', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(<Infobox>CONTENT</Infobox>, {
      wrapper: TestComponentWrapper,
    });
    expect(container).toMatchSnapshot();

    const content = getByText(container, 'CONTENT');
    expect(content).toBeInTheDocument();
  });

  it('should render variations', async () => {
    const { container: info } = await waitForComponent(
      <Infobox type="info">INFO</Infobox>,
      { wrapper: TestComponentWrapper },
    );
    expect(info).toMatchSnapshot();

    const { container: error } = await waitForComponent(
      <Infobox type="error">ERROR</Infobox>,
      { wrapper: TestComponentWrapper },
    );
    expect(error).toMatchSnapshot();

    const { container: success } = await waitForComponent(
      <Infobox type="success">SUCCESS</Infobox>,
      { wrapper: TestComponentWrapper },
    );
    expect(success).toMatchSnapshot();
  });
});
