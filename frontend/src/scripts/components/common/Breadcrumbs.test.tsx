import { getAllByRole, getByRole } from '@testing-library/dom';
import { describe, expect, it } from '@jest/globals';

import { Breadcrumbs } from 'components/common/Breadcrumbs';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/common/Breadcrumbs', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <Breadcrumbs items={['movieList', 'movieDetail']} />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const list = getByRole(container, 'list');
    expect(list).toBeInTheDocument();

    const items = getAllByRole(list, 'listitem');
    expect(items.length).toEqual(3);

    const itemContents = items.map((item) => item.textContent);
    expect(itemContents).toEqual(['Domů', 'Filmy', 'Detail filmu']);
  });

  it('should render empty list', async () => {
    const { container } = await waitForComponent(<Breadcrumbs />, {
      wrapper: TestComponentWrapper,
    });
    expect(container.innerHTML).toEqual('');
  });
});
