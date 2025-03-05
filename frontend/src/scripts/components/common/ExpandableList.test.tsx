import {
  fireEvent,
  getByRole,
  getByText,
  queryByRole,
  getAllByRole,
} from '@testing-library/dom';
import { act } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';

import { ExpandableList } from 'components/common/ExpandableList';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

describe('components/common/ExpandableList', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <ExpandableList
        values={[
          { title: 'Item 1', url: '/item-1' },
          { title: 'Item 2', url: '/item-2' },
          { title: 'Item 3', url: '/item-3' },
        ]}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const visibleItem = getByText(container, 'Item 1');
    expect(visibleItem).toBeInTheDocument();
    expect(visibleItem.nodeName.toLowerCase()).toEqual('a');
    expect(visibleItem).toHaveAttribute('href', '/item-1');

    const moreButton = getByText(container, '2 další');
    expect(moreButton).toBeInTheDocument();
    expect(moreButton.nodeName.toLowerCase()).toEqual('button');
  });

  it('should render one item', async () => {
    const { container } = await waitForComponent(
      <ExpandableList values={[{ title: 'Item 1', url: '/item-1' }]} />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const visibleItem = getByText(container, 'Item 1');
    expect(visibleItem).toBeInTheDocument();

    const moreButton = queryByRole(container, 'button');
    expect(moreButton).not.toBeInTheDocument();
  });

  it('should render empty list', async () => {
    const { container } = await waitForComponent(
      <ExpandableList values={[]} />,
      { wrapper: TestComponentWrapper },
    );
    expect(container.innerHTML).toEqual('-');
  });

  it('should be expandable', async () => {
    const { container } = await waitForComponent(
      <ExpandableList
        values={[
          { title: 'Item 1', url: '/item-1' },
          { title: 'Item 2', url: '/item-2' },
          { title: 'Item 3', url: '/item-3' },
        ]}
      />,
      { wrapper: TestComponentWrapper },
    );
    expect(container).toMatchSnapshot();

    const visibleItem = getByText(container, 'Item 1');
    expect(visibleItem).toBeInTheDocument();

    const moreButton = getByText(container, '2 další');
    expect(moreButton).toBeInTheDocument();

    // list is not visible
    let list = queryByRole(container, 'list');
    expect(list).not.toBeInTheDocument();

    // open expandable list
    act(() => {
      fireEvent.click(moreButton);
    });
    expect(container).toMatchSnapshot();

    list = getByRole(container, 'list');
    expect(list).toBeInTheDocument();

    const listItems = getAllByRole(container, 'listitem');
    expect(listItems.length).toEqual(2);

    const itemsContent = listItems.map((item) => item.textContent);
    expect(itemsContent).toEqual(['Item 2', 'Item 3']);

    // close expandable list
    act(() => {
      fireEvent.keyUp(document, { key: 'Escape' });
    });

    list = queryByRole(container, 'list');
    expect(list).not.toBeInTheDocument();
  });
});
