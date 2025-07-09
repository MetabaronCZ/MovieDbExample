import { act, renderHook } from '@testing-library/react';
import { it, describe, expect, jest } from '@jest/globals';

import { PagingConfig, usePaging } from './usePaging';

const defaultPerPage = 25;

describe('hooks/usePaging', () => {
  it('should return paging data', () => {
    const pagingConfig: PagingConfig<number> = {
      perPage: 3,
      perPages: [3, 4, 5],
      totalCount: 10,
      onPage: () => Promise.resolve(),
      onPerPage: () => Promise.resolve(),
    };
    const { result } = renderHook(() => usePaging(pagingConfig));

    expect(result.current.page).toEqual(0);
    expect(result.current.from).toEqual(0);
    expect(result.current.to).toEqual(3);
    expect(result.current.totalCount).toEqual(10);
    expect(result.current.lastPage).toEqual(3);
    expect(result.current.perPage).toEqual(3);
    expect(result.current.perPages).toEqual([3, 4, 5]);
  });

  it('should set perPage when not provided', () => {
    const pagingConfig: PagingConfig<number> = {
      perPages: [4, 5],
      totalCount: 10,
      onPage: () => Promise.resolve(),
      onPerPage: () => Promise.resolve(),
    };
    const { result } = renderHook(() => usePaging(pagingConfig));

    expect(result.current.perPage).toEqual(4);
    expect(result.current.perPages).toEqual([4, 5]);
  });

  it('should set perPages when not provided', () => {
    const pagingConfig: PagingConfig<number> = {
      perPage: 5,
      totalCount: 10,
      onPage: () => Promise.resolve(),
      onPerPage: () => Promise.resolve(),
    };
    const { result } = renderHook(() => usePaging(pagingConfig));

    expect(result.current.perPage).toEqual(5);
    expect(result.current.perPages).toEqual([5]);
  });

  it('should use default value when no per page values provided', () => {
    const pagingConfig: PagingConfig<number> = {
      totalCount: 10,
      onPage: () => Promise.resolve(),
      onPerPage: () => Promise.resolve(),
    };
    const { result } = renderHook(() => usePaging(pagingConfig));

    expect(result.current.perPage).toEqual(defaultPerPage);
    expect(result.current.perPages).toEqual([defaultPerPage]);
  });

  it('should be able to change perPage value', async () => {
    const onPerPage = jest.fn<(perPage: number) => Promise<void>>(() => {
      return Promise.resolve();
    });

    const pagingConfig: PagingConfig<number> = {
      perPage: 5,
      perPages: [5, 10, 25],
      totalCount: 10,
      onPage: () => Promise.resolve(),
      onPerPage,
    };
    const { result } = renderHook(() => usePaging(pagingConfig));
    expect(onPerPage).not.toHaveBeenCalled();

    expect(result.current.perPage).toEqual(5);

    await act(async () => {
      await result.current.setPerPage(10);
    });

    expect(result.current.perPage).toEqual(10);
    expect(onPerPage).toHaveBeenCalledTimes(1);
    expect(onPerPage).toHaveBeenCalledWith(10);
  });

  it('should be able to navigate pages', async () => {
    const onPage = jest.fn<(page: number, perPage: number) => Promise<void>>(
      () => Promise.resolve(),
    );

    const pagingConfig: PagingConfig<number> = {
      perPage: 3,
      perPages: [3, 4, 5],
      totalCount: 10,
      onPage,
      onPerPage: () => Promise.resolve(),
    };
    const { result } = renderHook(() => usePaging(pagingConfig));
    expect(onPage).not.toHaveBeenCalled();
    expect(result.current.page).toEqual(0);
    expect(result.current.lastPage).toEqual(3);

    // cant go prev on first page
    await act(async () => {
      await result.current.gotoPrev();
    });
    expect(onPage).toHaveBeenCalledTimes(0);
    expect(result.current.page).toEqual(0);
    expect(result.current.from).toEqual(0);
    expect(result.current.to).toEqual(3);

    // go next pages
    await act(async () => {
      await result.current.gotoNext();
    });
    expect(onPage).toHaveBeenCalledTimes(1);
    expect(onPage).toHaveBeenLastCalledWith(1, 3);
    expect(result.current.page).toEqual(1);
    expect(result.current.from).toEqual(3);
    expect(result.current.to).toEqual(6);

    await act(async () => {
      await result.current.gotoNext();
    });
    expect(onPage).toHaveBeenCalledTimes(2);
    expect(onPage).toHaveBeenLastCalledWith(2, 3);
    expect(result.current.page).toEqual(2);
    expect(result.current.from).toEqual(6);
    expect(result.current.to).toEqual(9);

    await act(async () => {
      await result.current.gotoNext();
    });
    expect(onPage).toHaveBeenCalledTimes(3);
    expect(onPage).toHaveBeenLastCalledWith(3, 3);
    expect(result.current.page).toEqual(3);
    expect(result.current.from).toEqual(9);
    expect(result.current.to).toEqual(10);

    // cant go past last page
    await act(async () => {
      await result.current.gotoNext();
    });
    expect(onPage).toHaveBeenCalledTimes(3);
    expect(result.current.page).toEqual(3);

    // got to first page
    await act(async () => {
      await result.current.gotoFirst();
    });
    expect(onPage).toHaveBeenCalledTimes(4);
    expect(onPage).toHaveBeenLastCalledWith(0, 3);
    expect(result.current.page).toEqual(0);

    // got to last page
    await act(async () => {
      await result.current.gotoLast();
    });
    expect(onPage).toHaveBeenCalledTimes(5);
    expect(onPage).toHaveBeenLastCalledWith(3, 3);
    expect(result.current.page).toEqual(3);
  });

  it('should set page to zero when perPage changes', async () => {
    const onPage = jest.fn<(page: number, perPage: number) => Promise<void>>(
      () => Promise.resolve(),
    );
    const onPerPage = jest.fn<(perPage: number) => Promise<void>>(() => {
      return Promise.resolve();
    });

    const pagingConfig: PagingConfig<number> = {
      perPage: 3,
      perPages: [3, 4, 5],
      totalCount: 10,
      onPage,
      onPerPage,
    };
    const { result } = renderHook(() => usePaging(pagingConfig));
    expect(onPage).not.toHaveBeenCalled();
    expect(onPerPage).not.toHaveBeenCalled();
    expect(result.current.page).toEqual(0);

    // got to next page
    await act(async () => {
      await result.current.gotoNext();
    });
    expect(onPage).toHaveBeenCalledTimes(1);
    expect(onPage).toHaveBeenCalledWith(1, 3);
    expect(onPerPage).not.toHaveBeenCalled();
    expect(result.current.page).toEqual(1);

    // change paging
    await act(async () => {
      await result.current.setPerPage(4);
    });
    expect(onPage).toHaveBeenCalledTimes(1);
    expect(onPerPage).toHaveBeenCalledTimes(1);
    expect(onPerPage).toHaveBeenCalledWith(4);
    expect(result.current.page).toEqual(0);
  });
});
