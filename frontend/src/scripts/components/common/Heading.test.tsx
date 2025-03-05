import { getByText } from '@testing-library/dom';
import { describe, expect, it } from '@jest/globals';

import { Heading } from './Heading';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/common/Heading', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(<Heading>CONTENT</Heading>, {
      wrapper: TestComponentWrapper,
    });
    expect(container).toMatchSnapshot();

    const heading = getByText(container, 'CONTENT');
    expect(heading).toBeInTheDocument();
  });

  it('should render different variations', async () => {
    const { container: h1 } = await waitForComponent(
      <Heading tag="h1">HEADING_H1</Heading>,
      { wrapper: TestComponentWrapper },
    );
    expect(h1).toMatchSnapshot();
    expect(h1.querySelector('h1')).toBeInTheDocument();

    const { container: h2 } = await waitForComponent(
      <Heading tag="h2">HEADING_H2</Heading>,
      { wrapper: TestComponentWrapper },
    );
    expect(h2).toMatchSnapshot();
    expect(h2.querySelector('h2')).toBeInTheDocument();

    const { container: h3 } = await waitForComponent(
      <Heading tag="h3">HEADING_H3</Heading>,
      { wrapper: TestComponentWrapper },
    );
    expect(h3).toMatchSnapshot();
    expect(h3.querySelector('h3')).toBeInTheDocument();

    const { container: h4 } = await waitForComponent(
      <Heading tag="h4">HEADING_H4</Heading>,
      { wrapper: TestComponentWrapper },
    );
    expect(h4).toMatchSnapshot();
    expect(h4.querySelector('h4')).toBeInTheDocument();
  });
});
