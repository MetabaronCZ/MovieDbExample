import { describe, expect, it } from '@jest/globals';

import { Ico } from './Ico';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/common/Ico', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(<Ico ico="cross" />, {
      wrapper: TestComponentWrapper,
    });
    expect(container).toMatchSnapshot();

    const ico = container.querySelector('svg.fa-xmark');
    expect(ico).toBeInTheDocument();
  });

  it('should support different sizes', async () => {
    const { container: icoDefault } = await waitForComponent(
      <Ico ico="cross" size="default" />,
      { wrapper: TestComponentWrapper },
    );
    expect(icoDefault).toMatchSnapshot();

    const { container: icoLarge } = await waitForComponent(
      <Ico ico="cross" size="large" />,
      { wrapper: TestComponentWrapper },
    );
    expect(icoLarge).toMatchSnapshot();

    const { container: icoLarger } = await waitForComponent(
      <Ico ico="cross" size="larger" />,
      { wrapper: TestComponentWrapper },
    );
    expect(icoLarger).toMatchSnapshot();
  });
});
