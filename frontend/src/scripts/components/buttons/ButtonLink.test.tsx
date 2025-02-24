import { describe, expect, it } from '@jest/globals';
import { getByRole } from '@testing-library/dom';

import { ButtonLink } from 'components/buttons/ButtonLink';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/button/ButtonLink', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <ButtonLink text="CONTENT" to="/test" />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const link = getByRole(container, 'link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('CONTENT');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('should render ico before', async () => {
    const { container } = await waitForComponent(
      <ButtonLink text="CONTENT" icoBefore="cross" to="/test" />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const link = getByRole(container, 'link');
    expect(link).toBeInTheDocument();

    const ico = link.querySelector('svg.fa-xmark');
    expect(ico).toBeInTheDocument();
  });

  it('should render ico after', async () => {
    const { container } = await waitForComponent(
      <ButtonLink text="CONTENT" icoAfter="cross" to="/test" />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const link = getByRole(container, 'link');
    expect(link).toBeInTheDocument();

    const ico = link.querySelector('svg.fa-xmark');
    expect(ico).toBeInTheDocument();
  });
});
