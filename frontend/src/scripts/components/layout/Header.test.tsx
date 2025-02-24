import { getByText } from '@testing-library/dom';
import { describe, expect, it } from '@jest/globals';

import { Header } from './Header';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/layout/Header', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(<Header />, {
      wrapper: TestComponentWrapper,
    });
    expect(container).toMatchSnapshot();

    const header = container.getElementsByTagName('header');
    expect(header.length).toEqual(1);

    const logo = getByText(container, 'Databáze filmů USA (1900 - 1999)');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '/');
  });
});
