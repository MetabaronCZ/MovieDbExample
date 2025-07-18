import React from 'react';

// select results / options horizontal orientation
export type SelectAlign = 'left' | 'right';

export interface SelectOption<T> {
  readonly title: string;
  readonly extra?: React.JSX.Element;
  readonly description?: string;
  readonly value: T;
  readonly disabled?: boolean;
}

export interface SelectSearchProps<T> {
  readonly loading?: boolean;
  readonly value: SelectOption<T>[];
  readonly onSearch: (query: string) => Promise<SelectOption<T>[]>;
}

export interface SelectProps<
  T,
  U extends boolean,
  V = U extends true ? T[] : T,
> {
  readonly id?: string;
  readonly value: V;
  readonly align?: SelectAlign;
  readonly options: SelectOption<T>[];
  readonly disabled?: boolean;
  readonly onSelect: (value: V) => void;
}
