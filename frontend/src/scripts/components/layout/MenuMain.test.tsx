import { describe, expect, it } from '@jest/globals';
import { getAllByRole, getByRole } from '@testing-library/dom';

import { MenuMain } from 'components/layout/MenuMain';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/layout/MenuMain', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(<MenuMain />, {
      wrapper: TestComponentWrapper,
    });
    expect(container).toMatchSnapshot();

    const nav = container.getElementsByTagName('nav');
    expect(nav.length).toEqual(1);

    const menuList = getByRole(container, 'list');
    expect(menuList).toBeInTheDocument();

    const menuLinks = getAllByRole(menuList, 'link');
    expect(menuLinks.length).toBeGreaterThan(0);
  });
});
