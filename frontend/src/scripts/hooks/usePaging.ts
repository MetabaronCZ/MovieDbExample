import { useCallback, useEffect, useState } from 'react';
import { defaultPerPage } from '@project/api-types';

export interface PagingConfig<T extends number> {
  readonly page?: number;
  readonly perPage?: T;
  readonly perPages?: T[];
  readonly totalCount: number;
  readonly onPage: (page: number, perPage: T) => Promise<unknown>;
  readonly onPerPage: (perPage: T) => Promise<unknown>;
}

export interface UsePaging<T extends number> {
  readonly from: number;
  readonly to: number;
  readonly totalCount: number;
  readonly page: number;
  readonly lastPage: number;
  readonly perPage: T;
  readonly perPages: T[];
  readonly disabled: boolean;
  readonly setPerPage: (perPage: T) => void;
  readonly gotoFirst: () => void;
  readonly gotoPrev: () => void;
  readonly gotoNext: () => void;
  readonly gotoLast: () => void;
}

export const usePaging = <T extends number>(
  config: PagingConfig<T>,
): UsePaging<T> => {
  const { totalCount, onPage, onPerPage } = config;

  const [page, setPage] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const [perPage, setPerPage] = useState<T>(
    config.perPage ?? (defaultPerPage as T),
  );
  const [perPages, setPerPages] = useState<T[]>(config.perPages ?? []);

  // handle page change request
  const updatePage = useCallback(
    async (page: number): Promise<void> => {
      setDisabled(true);
      try {
        await onPage(page, perPage);
        setPage(page);
      } catch (error) {
        // onPage request error
      } finally {
        setDisabled(false);
      }
    },
    [onPage, perPage],
  );

  // handle perPage change request
  const updatePerPage = useCallback(
    async (perPage: T): Promise<void> => {
      setDisabled(true);
      try {
        await onPerPage(perPage);
        setPerPage(perPage);
        setPage(0);
      } catch (error) {
        // onPage request error
      } finally {
        setDisabled(false);
      }
    },
    [onPerPage],
  );

  // update perPage value configuration
  useEffect(() => {
    const perPages = config.perPages ?? [];
    let perPage = config.perPage ?? perPages[0];

    if (0 === perPages.length) {
      if ('undefined' === typeof perPage) {
        perPage = defaultPerPage as T;
      }
      perPages.push(perPage);
    }
    if ('undefined' === typeof perPage) {
      perPage = perPages[0];
    }
    setPerPage(perPage);
    setPerPages(perPages);
  }, [config.perPage, config.perPages]);

  // update page from config
  useEffect(() => {
    if ('number' === typeof config.page) {
      setPage(config.page);
    }
  }, [config.page]);

  const start = page * perPage;
  const end = Math.min(start + perPage, totalCount);
  let lastPage = Math.floor(totalCount / perPage);

  if (lastPage > 0 && 0 === totalCount % perPage) {
    lastPage -= 1;
  }

  return {
    from: start,
    to: end,
    totalCount,
    page,
    lastPage,
    perPage,
    perPages,
    disabled,
    setPerPage: (value) => {
      void updatePerPage(value);
    },
    gotoFirst: () => {
      void updatePage(0);
    },
    gotoPrev: () => {
      if (page > 0) {
        void updatePage(page - 1);
      }
    },
    gotoNext: () => {
      if (page < lastPage) {
        void updatePage(page + 1);
      }
    },
    gotoLast: () => {
      void updatePage(lastPage);
    },
  };
};
