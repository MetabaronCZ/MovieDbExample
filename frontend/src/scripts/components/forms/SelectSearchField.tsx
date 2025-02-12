import React from 'react';

import { FormField } from 'components/forms/FormField';
import { SelectSearch } from 'components/forms/select/SelectSearch';
import {
  SelectAlign,
  SelectOption,
  SelectSearchProps,
} from './select/SelectShared';

// track number of rendered items to generate auto ID
let instanceId = 0;

interface Props<T> extends SelectSearchProps<T> {
  readonly id?: string;
  readonly label: string;
  readonly align?: SelectAlign;
  readonly error?: string | null;
  readonly info?: string;
  readonly options: SelectOption<T>[];
  readonly disabled?: boolean;
  readonly vertical?: boolean;
  readonly required?: boolean;
  readonly onSelect: (value: T[]) => void;
}

export const SelectSearchField = <T,>({
  id = `select-search-${instanceId++}`,
  label,
  error,
  info,
  value,
  options,
  align,
  loading = false,
  vertical = false,
  required,
  disabled,
  onSearch,
  onSelect,
}: Props<T>): React.ReactNode => (
  <FormField
    id={id}
    label={label}
    error={error}
    info={info}
    required={required}
    orientation={vertical ? 'vertical' : 'horizontal'}
  >
    <SelectSearch<T>
      id={id}
      align={align}
      value={value}
      options={options}
      loading={loading}
      disabled={disabled}
      onSearch={onSearch}
      onSelect={onSelect}
    />
  </FormField>
);
