import React from 'react';

import { act } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';
import {
  fireEvent,
  getByText,
  getByTitle,
  queryByRole,
  getAllByRole,
} from '@testing-library/dom';

import { Paging } from './Paging';
import { PagingConfig, usePaging } from 'hooks/usePaging';

import { flushPromises } from 'test-utils/core';
import { TestComponentWrapper, waitForComponent } from 'test-utils/component';

interface Props {
  readonly config: PagingConfig<number>;
}

const PagingWrapper: React.FC<Props> = ({ config }) => {
  const paging = usePaging(config);
  return (
    <TestComponentWrapper>
      <Paging paging={paging} />
    </TestComponentWrapper>
  );
};

describe('components/common/Paging', () => {
  it('should render properly', async () => {
    const { container } = await waitForComponent(
      <PagingWrapper
        config={{
          totalCount: 10,
          perPage: 3,
          onPage: () => Promise.resolve(),
          onPerPage: () => Promise.resolve(),
        }}
      />,
    );
    expect(container).toMatchSnapshot();

    const pagingInfo = getByText(container, 'Položky 1 až 3 z 10');
    expect(pagingInfo).toBeInTheDocument();

    const pageNumber = getByText(container, '1');
    expect(pageNumber).toBeInTheDocument();

    const buttonToFirst = getByTitle(container, 'Na začátek');
    expect(buttonToFirst).toBeInTheDocument();
    expect(buttonToFirst.tagName.toLowerCase()).toEqual('button');

    const buttonToLast = getByTitle(container, 'Na konec');
    expect(buttonToLast).toBeInTheDocument();
    expect(buttonToLast.tagName.toLowerCase()).toEqual('button');

    const buttonPrev = getByTitle(container, 'Předchozí');
    expect(buttonPrev).toBeInTheDocument();
    expect(buttonPrev.tagName.toLowerCase()).toEqual('button');

    const buttonNext = getByTitle(container, 'Další');
    expect(buttonNext).toBeInTheDocument();
    expect(buttonNext.tagName.toLowerCase()).toEqual('button');

    const pagingLabel = getByText(container, 'Stránkování');
    expect(pagingLabel).toBeInTheDocument();

    const htmlFor = pagingLabel.getAttribute('for') ?? '';
    expect(htmlFor).not.toEqual('');

    const pagingHandle = container.querySelector(`[id="${htmlFor}"]`);
    expect(pagingHandle).toBeInTheDocument();
    expect(pagingHandle).toHaveTextContent('3'); // selected paging
  });

  it('should render first page', async () => {
    const { container } = await waitForComponent(
      <PagingWrapper
        config={{
          totalCount: 10,
          perPage: 3,
          page: 0,
          onPage: () => Promise.resolve(),
          onPerPage: () => Promise.resolve(),
        }}
      />,
    );

    const pagingInfo = getByText(container, 'Položky 1 až 3 z 10');
    expect(pagingInfo).toBeInTheDocument();

    const pageNumber = getByText(container, '1');
    expect(pageNumber).toBeInTheDocument();

    const buttonToFirst = getByTitle(container, 'Na začátek');
    expect(buttonToFirst).toBeInTheDocument();
    expect(buttonToFirst).toHaveAttribute('disabled', '');

    const buttonToLast = getByTitle(container, 'Na konec');
    expect(buttonToLast).toBeInTheDocument();
    expect(buttonToLast).not.toHaveAttribute('disabled', '');

    const buttonPrev = getByTitle(container, 'Předchozí');
    expect(buttonPrev).toBeInTheDocument();
    expect(buttonPrev).toHaveAttribute('disabled', '');

    const buttonNext = getByTitle(container, 'Další');
    expect(buttonNext).toBeInTheDocument();
    expect(buttonNext).not.toHaveAttribute('disabled', '');
  });

  it('should render inner page', async () => {
    const { container } = await waitForComponent(
      <PagingWrapper
        config={{
          totalCount: 10,
          perPage: 3,
          page: 1,
          onPage: () => Promise.resolve(),
          onPerPage: () => Promise.resolve(),
        }}
      />,
    );

    const pagingInfo = getByText(container, 'Položky 4 až 6 z 10');
    expect(pagingInfo).toBeInTheDocument();

    const pageNumber = getByText(container, '2');
    expect(pageNumber).toBeInTheDocument();

    const buttonToFirst = getByTitle(container, 'Na začátek');
    expect(buttonToFirst).toBeInTheDocument();
    expect(buttonToFirst).not.toHaveAttribute('disabled', '');

    const buttonToLast = getByTitle(container, 'Na konec');
    expect(buttonToLast).toBeInTheDocument();
    expect(buttonToLast).not.toHaveAttribute('disabled', '');

    const buttonPrev = getByTitle(container, 'Předchozí');
    expect(buttonPrev).toBeInTheDocument();
    expect(buttonPrev).not.toHaveAttribute('disabled', '');

    const buttonNext = getByTitle(container, 'Další');
    expect(buttonNext).toBeInTheDocument();
    expect(buttonNext).not.toHaveAttribute('disabled', '');
  });

  it('should render last page', async () => {
    const { container } = await waitForComponent(
      <PagingWrapper
        config={{
          totalCount: 10,
          perPage: 3,
          page: 3,
          onPage: () => Promise.resolve(),
          onPerPage: () => Promise.resolve(),
        }}
      />,
    );

    const pagingInfo = getByText(container, 'Položky 10 až 10 z 10');
    expect(pagingInfo).toBeInTheDocument();

    const pageNumber = getByText(container, '4');
    expect(pageNumber).toBeInTheDocument();

    const buttonToFirst = getByTitle(container, 'Na začátek');
    expect(buttonToFirst).toBeInTheDocument();
    expect(buttonToFirst).not.toHaveAttribute('disabled', '');

    const buttonToLast = getByTitle(container, 'Na konec');
    expect(buttonToLast).toBeInTheDocument();
    expect(buttonToLast).toHaveAttribute('disabled', '');

    const buttonPrev = getByTitle(container, 'Předchozí');
    expect(buttonPrev).toBeInTheDocument();
    expect(buttonPrev).not.toHaveAttribute('disabled', '');

    const buttonNext = getByTitle(container, 'Další');
    expect(buttonNext).toBeInTheDocument();
    expect(buttonNext).toHaveAttribute('disabled', '');
  });

  it('should be navigable', async () => {
    const { container } = await waitForComponent(
      <PagingWrapper
        config={{
          totalCount: 10,
          perPage: 3,
          onPage: () => Promise.resolve(),
          onPerPage: () => Promise.resolve(),
        }}
      />,
    );

    // show first page by default
    let pagingInfo = getByText(container, 'Položky 1 až 3 z 10');
    expect(pagingInfo).toBeInTheDocument();

    let pageNumber = getByText(container, '1');
    expect(pageNumber).toBeInTheDocument();

    const buttonToFirst = getByTitle(container, 'Na začátek');
    expect(buttonToFirst).toBeInTheDocument();
    expect(buttonToFirst).toHaveAttribute('disabled', '');

    const buttonToLast = getByTitle(container, 'Na konec');
    expect(buttonToLast).toBeInTheDocument();
    expect(buttonToLast).not.toHaveAttribute('disabled', '');

    const buttonPrev = getByTitle(container, 'Předchozí');
    expect(buttonPrev).toBeInTheDocument();
    expect(buttonPrev).toHaveAttribute('disabled', '');

    const buttonNext = getByTitle(container, 'Další');
    expect(buttonNext).toBeInTheDocument();
    expect(buttonNext).not.toHaveAttribute('disabled', '');

    // go to next page
    await act(async () => {
      fireEvent.click(buttonNext);
      await flushPromises();
    });

    pagingInfo = getByText(container, 'Položky 4 až 6 z 10');
    expect(pagingInfo).toBeInTheDocument();

    pageNumber = getByText(container, '2');
    expect(pageNumber).toBeInTheDocument();

    expect(buttonToFirst).not.toHaveAttribute('disabled', '');
    expect(buttonToLast).not.toHaveAttribute('disabled', '');
    expect(buttonPrev).not.toHaveAttribute('disabled', '');
    expect(buttonNext).not.toHaveAttribute('disabled', '');

    // go to last page
    await act(async () => {
      fireEvent.click(buttonToLast);
      await flushPromises();
    });

    pagingInfo = getByText(container, 'Položky 10 až 10 z 10');
    expect(pagingInfo).toBeInTheDocument();

    pageNumber = getByText(container, '4');
    expect(pageNumber).toBeInTheDocument();

    expect(buttonToFirst).not.toHaveAttribute('disabled', '');
    expect(buttonToLast).toHaveAttribute('disabled', '');
    expect(buttonPrev).not.toHaveAttribute('disabled', '');
    expect(buttonNext).toHaveAttribute('disabled', '');

    // go to first page
    await act(async () => {
      fireEvent.click(buttonToFirst);
      await flushPromises();
    });

    pagingInfo = getByText(container, 'Položky 1 až 3 z 10');
    expect(pagingInfo).toBeInTheDocument();

    pageNumber = getByText(container, '1');
    expect(pageNumber).toBeInTheDocument();

    expect(buttonToFirst).toHaveAttribute('disabled', '');
    expect(buttonToLast).not.toHaveAttribute('disabled', '');
    expect(buttonPrev).toHaveAttribute('disabled', '');
    expect(buttonNext).not.toHaveAttribute('disabled', '');
  });

  it('should contain perPage select', async () => {
    const onPerPage = jest.fn(() => Promise.resolve());

    const { container } = await waitForComponent(
      <PagingWrapper
        config={{
          totalCount: 10,
          perPage: 3,
          perPages: [3, 6, 9],
          onPage: () => Promise.resolve(),
          onPerPage,
        }}
      />,
    );
    expect(container).toMatchSnapshot();
    expect(onPerPage).not.toBeCalled();

    const pagingLabel = getByText(container, 'Stránkování');
    const htmlFor = pagingLabel.getAttribute('for') ?? '';

    const pagingHandle = container.querySelector(`[id="${htmlFor}"]`);
    expect(pagingHandle).toBeInTheDocument();
    expect(pagingHandle).toHaveTextContent('3'); // selected paging

    const selectContainer = pagingHandle?.parentNode;

    if (!pagingHandle || !selectContainer) {
      throw new Error('Could not find perPage select handle!');
    }
    let pagingList = queryByRole(selectContainer as HTMLElement, 'list');
    expect(pagingList).not.toBeInTheDocument();

    // open perPage select
    act(() => {
      fireEvent.click(pagingHandle);
    });

    pagingList = queryByRole(selectContainer as HTMLElement, 'list');
    expect(pagingList).toBeInTheDocument();

    if (!pagingList) {
      throw new Error('Could not find perPage select items container!');
    }
    const items = getAllByRole(pagingList, 'button');
    expect(items.length).toEqual(3);

    expect(items[0]).toHaveTextContent('3');
    expect(items[1]).toHaveTextContent('6');
    expect(items[2]).toHaveTextContent('9');

    // select another perPage
    await act(async () => {
      fireEvent.click(items[2]);
      await flushPromises();
    });
    expect(onPerPage).toBeCalledTimes(1);
    expect(onPerPage).toBeCalledWith(9);
  });
});
