import { useCallback, useEffect, useRef, useState } from 'react';

const defaultDelayTime = 150; // time to wait for query changes (in milliseconds)
const minQueryLength = 2; // minimum query length to start search

interface UseSearchConfig {
  readonly query?: string;
  readonly delayTime?: number;
  readonly onSearch: (value: string) => void;
}

interface UseSearch {
  readonly query: string;
  readonly search: (query: string, force?: boolean) => void;
  readonly clear: () => void;
}

export const useSearch = (config: UseSearchConfig): UseSearch => {
  const [query, setQuery] = useState('');
  const timeout = useRef<number | null>(null);

  const delayTime = config.delayTime ?? defaultDelayTime;

  useEffect(() => {
    setQuery(config.query ?? '');
  }, [config.query]);

  const search = useCallback(
    (value: string, force = false): void => {
      if (null !== timeout.current) {
        window.clearTimeout(timeout.current);
      }
      setQuery(value);

      if (!force && value.length < minQueryLength) {
        return;
      }
      timeout.current = window.setTimeout(
        () => {
          config.onSearch(value);
          timeout.current = null;
        },
        force ? 0 : delayTime,
      );
    },
    [config, delayTime],
  );

  const clear = useCallback(() => {
    search('', true);
  }, [search]);

  return {
    query,
    search,
    clear,
  };
};
