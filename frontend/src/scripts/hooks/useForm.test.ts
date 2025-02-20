import { describe, expect, it, jest } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';

import { useForm } from './useForm';

describe('hooks/useForm', () => {
  it('should return initial form data', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: {
          x: 1,
          y: 'A',
        },
      }),
    );

    expect(Object.keys(result.current.values).length).toEqual(2);
    expect(result.current.values.x).toEqual(1);
    expect(result.current.values.y).toEqual('A');

    expect(result.current.errors).toEqual({});
    expect(result.current.isModified).toEqual(false);

    expect(typeof result.current.setValue).toEqual('function');
    expect(typeof result.current.submit).toEqual('function');
    expect(typeof result.current.clear).toEqual('function');
    expect(typeof result.current.fixateData).toEqual('function');
  });

  it('should update form data', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: {
          x: 1,
          y: 'A',
        },
      }),
    );

    expect(result.current.values.x).toEqual(1);
    expect(result.current.values.y).toEqual('A');

    act(() => {
      result.current.setValue('x', 7);
      result.current.setValue('y', 'X');
    });

    expect(result.current.values.x).toEqual(7);
    expect(result.current.values.y).toEqual('X');
    expect(result.current.isModified).toEqual(true);
    expect(result.current.errors).toEqual({ x: null, y: null });
  });

  it('should validate form data when changed', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: { x: 1, y: 'A' },
        validations: {
          x: [{ test: (value) => value > 0, error: 'ERROR' }],
        },
      }),
    );
    expect(result.current.values.x).toEqual(1);
    expect(result.current.errors).toEqual({});

    act(() => {
      result.current.setValue('x', -1);
    });

    expect(result.current.values.x).toEqual(-1);
    expect(result.current.values.y).toEqual('A');
    expect(result.current.isModified).toEqual(true);
    expect(result.current.errors.x).toEqual('ERROR');
    expect(typeof result.current.errors.y).not.toEqual('string');
  });

  it('should be able to skip validation field when changed', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: { x: 1, y: 'A' },
        validations: {
          x: [{ test: (value) => value > 0, error: 'ERROR' }],
        },
      }),
    );
    expect(result.current.values.x).toEqual(1);
    expect(result.current.errors).toEqual({});

    act(() => {
      // change field + skip validation
      result.current.setValue('x', -1, true);
    });

    expect(result.current.values.x).toEqual(-1);
    expect(result.current.values.y).toEqual('A');
    expect(result.current.isModified).toEqual(true);
    expect(result.current.errors.x).toEqual(null);
    expect(!!result.current.errors.y).toEqual(false);
  });

  it('should submit data', () => {
    const onSubmit = jest.fn();
    const onSubmitError = jest.fn();

    const { result } = renderHook(() =>
      useForm({
        initialValues: { x: 1, y: 'A' },
        onSubmit,
        onSubmitError,
      }),
    );
    expect(onSubmit).toBeCalledTimes(0);
    expect(onSubmitError).toBeCalledTimes(0);

    act(() => {
      result.current.submit();
    });

    expect(onSubmit).toBeCalledTimes(1);
    expect(onSubmit).toBeCalledWith({ x: 1, y: 'A' });

    expect(onSubmitError).toBeCalledTimes(0);
    expect(result.current.isModified).toEqual(false);
  });

  it('should not submit when field invalid', () => {
    const onSubmit = jest.fn();
    const onSubmitError = jest.fn();

    const { result } = renderHook(() =>
      useForm({
        initialValues: { x: -1, y: 'A' },
        validations: {
          x: [{ test: (value) => value > 0, error: 'ERROR' }],
        },
        onSubmit,
        onSubmitError,
      }),
    );
    expect(onSubmit).toBeCalledTimes(0);
    expect(onSubmitError).toBeCalledTimes(0);
    expect(result.current.isModified).toEqual(false);

    act(() => {
      result.current.submit();
    });

    expect(onSubmit).toBeCalledTimes(0);
    expect(onSubmitError).toBeCalledTimes(1);
    expect(result.current.isModified).toEqual(false);
    expect(result.current.errors).toEqual({ x: 'ERROR', y: null });
  });

  it('should clear form data to initial state', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: {
          x: 1,
          y: 'A',
        },
      }),
    );

    // update values
    act(() => {
      result.current.setValue('x', 45);
      result.current.setValue('y', 'ABC');
    });
    expect(result.current.values.x).toEqual(45);
    expect(result.current.values.y).toEqual('ABC');
    expect(result.current.isModified).toEqual(true);

    // clear form data
    act(() => {
      result.current.clear();
    });
    expect(result.current.values.x).toEqual(1);
    expect(result.current.values.y).toEqual('A');
    expect(result.current.isModified).toEqual(false);
  });

  it('should clear validation errors along the data', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: { x: 1, y: 'A' },
        validations: {
          x: [{ test: (value) => value > 0, error: 'ERROR' }],
        },
      }),
    );

    // update values
    act(() => {
      result.current.setValue('x', -1);
    });
    expect(result.current.values.x).toEqual(-1);
    expect(result.current.errors.x).toEqual('ERROR');
    expect(result.current.isModified).toEqual(true);

    // clear form data
    act(() => {
      result.current.clear();
    });
    expect(result.current.values.x).toEqual(1);
    expect(result.current.errors).toEqual({});
    expect(result.current.isModified).toEqual(false);
  });

  it('should update initial form data', () => {
    const { result } = renderHook(() =>
      useForm({
        initialValues: {
          x: 1,
          y: 'A',
        },
      }),
    );

    // update form data
    act(() => {
      result.current.setValue('x', 22);
      result.current.setValue('y', 'BB');
    });
    expect(result.current.values.x).toEqual(22);
    expect(result.current.values.y).toEqual('BB');
    expect(result.current.isModified).toEqual(true);

    // fixate current form data
    act(() => {
      result.current.fixateData();
    });
    expect(result.current.values.x).toEqual(22);
    expect(result.current.values.y).toEqual('BB');
    expect(result.current.isModified).toEqual(false);

    // try clear data to initial state
    act(() => {
      result.current.clear();
    });
    expect(result.current.values.x).toEqual(22);
    expect(result.current.values.y).toEqual('BB');
    expect(result.current.isModified).toEqual(false);
  });
});
