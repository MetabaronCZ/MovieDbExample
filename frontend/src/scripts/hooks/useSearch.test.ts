import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';

import { useSearch } from './useSearch';

describe('hooks/useSearch', () => {
  it('should return search data', () => {
    const { result } = renderHook(() =>
      useSearch({
        onSearch: () => null,
      }),
    );
    expect(result.current.query).toEqual('');
    expect(typeof result.current.clear).toEqual('function');
    expect(typeof result.current.search).toEqual('function');
  });

  it('should update internal state on given query', () => {
    const { result } = renderHook(() =>
      useSearch({
        query: 'QUERY',
        onSearch: () => null,
      }),
    );
    expect(result.current.query).toEqual('QUERY');
  });

  it('should search given query', async () => {
    const onSearch = jest.fn();

    const { result } = renderHook(() =>
      useSearch({
        onSearch,
      }),
    );
    expect(result.current.query).toEqual('');
    expect(onSearch).not.toHaveBeenCalled();

    act(() => {
      result.current.search('QUERY');
    });

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledTimes(1);
    });

    expect(result.current.query).toEqual('QUERY');
    expect(onSearch).toHaveBeenCalledWith('QUERY');
  });

  it('should force-search given query', async () => {
    const onSearch = jest.fn();

    const { result } = renderHook(() =>
      useSearch({
        onSearch,
      }),
    );
    expect(result.current.query).toEqual('');
    expect(onSearch).not.toHaveBeenCalled();

    act(() => {
      result.current.search('QUERY', true); // forced search
    });

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledTimes(1);
    });

    expect(result.current.query).toEqual('QUERY');
    expect(onSearch).toHaveBeenCalledWith('QUERY');
  });

  it('should callback only once on fast serial search', async () => {
    const onSearch = jest.fn();

    const { result } = renderHook(() =>
      useSearch({
        onSearch,
      }),
    );
    expect(result.current.query).toEqual('');
    expect(onSearch).not.toHaveBeenCalled();

    act(() => {
      result.current.search('QUERY 1');
      result.current.search('QUERY 2');
      result.current.search('QUERY 3');
      result.current.search('QUERY 4');
      result.current.search('QUERY 5');
    });

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledTimes(1);
    });

    expect(result.current.query).toEqual('QUERY 5');
    expect(onSearch).toHaveBeenCalledWith('QUERY 5');
  });

  it('should clear searched query', async () => {
    const onSearch = jest.fn();

    const { result } = renderHook(() =>
      useSearch({
        onSearch,
      }),
    );
    expect(result.current.query).toEqual('');
    expect(onSearch).not.toHaveBeenCalled();

    act(() => {
      result.current.clear();
    });

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledTimes(1);
    });

    expect(result.current.query).toEqual('');
    expect(onSearch).toHaveBeenCalledWith('');
  });
});
