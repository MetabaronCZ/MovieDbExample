import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

interface UseOpenerConfig {
  readonly onClose?: () => void;
}

interface UseOpener<T extends HTMLElement> {
  readonly ref: RefObject<T | null>;
  readonly opened: boolean;
  readonly open: () => void;
  readonly close: () => void;
  readonly toggle: () => void;
}

export const useOpener = <T extends HTMLElement>(
  config: UseOpenerConfig = {},
): UseOpener<T> => {
  const containerElement = useRef<T | null>(null);
  const [opened, setOpened] = useState(false);

  const open = useCallback(() => {
    setOpened(true);
  }, []);

  const close = useCallback(() => {
    setOpened(false);

    if (config.onClose) {
      config.onClose();
    }
  }, [config]);

  const toggle = useCallback(() => {
    if (opened) {
      close();
    } else {
      open();
    }
    setOpened(!opened);
  }, [close, open, opened]);

  const focusHandler = useCallback(
    (e: FocusEvent): void => {
      const focusedTarget = e.relatedTarget as Node | null;
      const container = containerElement.current;

      if (!!focusedTarget && !container?.contains(focusedTarget)) {
        close();
      }
    },
    [close],
  );

  const clickHandler = useCallback(
    (e: MouseEvent): void => {
      const target = e.target as Node;
      const container = containerElement.current;

      if (!container?.contains(target)) {
        close();
      }
    },
    [close],
  );

  const keyHandler = useCallback(
    (e: KeyboardEvent): void => {
      if ('Escape' === e.key) {
        close();
      }
    },
    [close],
  );

  // container close logic
  useEffect(() => {
    document.addEventListener('keyup', keyHandler);
    document.addEventListener('mouseup', clickHandler);
    document.addEventListener('focusout', focusHandler);

    return () => {
      document.removeEventListener('keyup', keyHandler);
      document.removeEventListener('mouseup', clickHandler);
      document.removeEventListener('focusout', focusHandler);
    };
  }, [clickHandler, focusHandler, keyHandler]);

  return {
    ref: containerElement,
    opened,
    open,
    close,
    toggle,
  };
};
