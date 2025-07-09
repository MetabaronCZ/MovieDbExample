import { describe, expect, it, jest } from '@jest/globals';
import {
  act,
  render,
  fireEvent,
  renderHook,
  getByTestId,
} from '@testing-library/react';

import { useOpener } from './useOpener';

describe('hooks/useOpener', () => {
  it('should return initial data', () => {
    const { result } = renderHook(() => useOpener());

    expect(result.current.opened).toEqual(false);
    expect(!!result.current.ref).toEqual(true);
    expect(typeof result.current.open).toEqual('function');
    expect(typeof result.current.close).toEqual('function');
    expect(typeof result.current.toggle).toEqual('function');
  });

  it('should handle open operation', () => {
    const onClose = jest.fn();

    const { result } = renderHook(() => useOpener({ onClose }));
    expect(onClose).toHaveBeenCalledTimes(0);
    expect(result.current.opened).toEqual(false);

    // open
    act(() => {
      result.current.open();
    });
    expect(onClose).toHaveBeenCalledTimes(0);
    expect(result.current.opened).toEqual(true);
  });

  it('should handle close operation', () => {
    const onClose = jest.fn();

    const { result } = renderHook(() => useOpener({ onClose }));
    expect(onClose).toHaveBeenCalledTimes(0);
    expect(result.current.opened).toEqual(false);

    // open
    act(() => {
      result.current.open();
    });
    expect(onClose).toHaveBeenCalledTimes(0);
    expect(result.current.opened).toEqual(true);

    // close
    act(() => {
      result.current.close();
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(result.current.opened).toEqual(false);
  });

  it('should handle toggle operation', () => {
    const onClose = jest.fn();

    const { result } = renderHook(() => useOpener({ onClose }));
    expect(onClose).toHaveBeenCalledTimes(0);
    expect(result.current.opened).toEqual(false);

    // toggle (open)
    act(() => {
      result.current.toggle();
    });
    expect(onClose).toHaveBeenCalledTimes(0);
    expect(result.current.opened).toEqual(true);

    // toggle (close)
    act(() => {
      result.current.toggle();
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(result.current.opened).toEqual(false);

    // toggle (open)
    act(() => {
      result.current.toggle();
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(result.current.opened).toEqual(true);

    // toggle (close)
    act(() => {
      result.current.toggle();
    });
    expect(onClose).toHaveBeenCalledTimes(2);
    expect(result.current.opened).toEqual(false);
  });

  it('should close on Escape key press', () => {
    const onClose = jest.fn();

    const { result } = renderHook(() => useOpener({ onClose }));
    expect(onClose).toHaveBeenCalledTimes(0);
    expect(result.current.opened).toEqual(false);

    // open
    act(() => {
      result.current.open();
    });
    expect(result.current.opened).toEqual(true);

    // press Escape
    act(() => {
      fireEvent.keyUp(document, { key: 'Escape' });
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(result.current.opened).toEqual(false);
  });

  it('should not close on other keys press', () => {
    const onClose = jest.fn();

    const { result } = renderHook(() => useOpener({ onClose }));
    expect(onClose).toHaveBeenCalledTimes(0);
    expect(result.current.opened).toEqual(false);

    // open
    act(() => {
      result.current.open();
    });
    expect(result.current.opened).toEqual(true);

    // press some keys
    act(() => {
      fireEvent.keyUp(document, { key: 'Enter' });
      fireEvent.keyUp(document, { key: '1' });
      fireEvent.keyUp(document, { key: 'a' });
      fireEvent.keyUp(document, { key: '' });
      fireEvent.keyUp(document);
    });
    expect(onClose).toHaveBeenCalledTimes(0);
    expect(result.current.opened).toEqual(true);
  });

  it('should handle mouse click', () => {
    const onClose = jest.fn();

    const { result } = renderHook(() => useOpener<HTMLDivElement>({ onClose }));

    const { container } = render(
      <div data-testid="outer">
        <div data-testid="handle" ref={result.current.ref}>
          <div data-testid="inner">CONTENT</div>
        </div>
      </div>,
    );
    expect(onClose).toHaveBeenCalledTimes(0);
    expect(result.current.opened).toEqual(false);

    // open
    act(() => {
      result.current.open();
    });
    expect(result.current.opened).toEqual(true);

    // click out of container (should close)
    act(() => {
      const outer = getByTestId(container, 'outer');
      fireEvent.mouseUp(outer);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(result.current.opened).toEqual(false);

    // open
    act(() => {
      result.current.open();
    });
    expect(result.current.opened).toEqual(true);

    // click on container (should keep opened)
    act(() => {
      const handle = getByTestId(container, 'handle');
      fireEvent.mouseUp(handle);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(result.current.opened).toEqual(true);

    // click inside container (should keep opened)
    act(() => {
      const inner = getByTestId(container, 'inner');
      fireEvent.mouseUp(inner);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(result.current.opened).toEqual(true);

    // click on document (should close)
    act(() => {
      fireEvent.mouseUp(document);
    });
    expect(onClose).toHaveBeenCalledTimes(2);
    expect(result.current.opened).toEqual(false);
  });

  it('should handle element focus', () => {
    const onClose = jest.fn();

    const { result } = renderHook(() => useOpener<HTMLDivElement>({ onClose }));

    const { container } = render(
      <div tabIndex={0} data-testid="outer">
        <div tabIndex={0} data-testid="handle" ref={result.current.ref}>
          <div tabIndex={0} data-testid="inner">
            CONTENT
          </div>
        </div>
      </div>,
    );
    expect(onClose).toHaveBeenCalledTimes(0);
    expect(result.current.opened).toEqual(false);

    // open
    act(() => {
      result.current.open();
    });
    expect(result.current.opened).toEqual(true);

    // focus out of container (should close)
    act(() => {
      const outer = getByTestId(container, 'outer');
      fireEvent.focusOut(document, { relatedTarget: outer });
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(result.current.opened).toEqual(false);

    // open
    act(() => {
      result.current.open();
    });
    expect(result.current.opened).toEqual(true);

    // focus container (should keep opened)
    act(() => {
      const handle = getByTestId(container, 'handle');
      fireEvent.focusOut(document, { relatedTarget: handle });
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(result.current.opened).toEqual(true);

    // focus inside of container (should keep opened)
    act(() => {
      const inner = getByTestId(container, 'inner');
      fireEvent.focusOut(document, { relatedTarget: inner });
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(result.current.opened).toEqual(true);

    // focus out (should keep opened)
    act(() => {
      fireEvent.focusOut(document, { relatedTarget: null });
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(result.current.opened).toEqual(true);
  });
});
