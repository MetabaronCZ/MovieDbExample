import React from 'react';

import { Select } from './select/Select';
import { SelectMulti } from './select/SelectMulti';
import { FormField, FormFieldOrientation } from 'components/forms/FormField';
import { SelectAlign, SelectOption } from './select/SelectShared';

// track number of rendered items to generate auto ID
let instanceId = 0;

type SelectFieldOrientation = Exclude<
  FormFieldOrientation,
  'horizontal-reverse'
>;

interface BaseProps<T> {
  readonly id?: string;
  readonly label?: string;
  readonly align?: SelectAlign;
  readonly orientation?: SelectFieldOrientation;
  readonly error?: string | null;
  readonly info?: string;
  readonly options: SelectOption<T>[];
  readonly disabled?: boolean;
  readonly required?: boolean;
}

interface DefaultProps<T> {
  readonly value: T;
  readonly multi?: false;
  readonly onSelect: (value: T) => void;
}

interface MultiProps<T> {
  readonly value: T[];
  readonly multi: true;
  readonly onSelect: (value: T[]) => void;
}
export type SelectFieldProps<T> = BaseProps<T> &
  (DefaultProps<T> | MultiProps<T>);

export const SelectField = <T,>({
  id = `select-${instanceId++}`,
  label,
  error,
  info,
  value,
  options,
  align,
  orientation = 'horizontal',
  multi,
  required,
  disabled,
  onSelect,
}: SelectFieldProps<T>): React.ReactNode => (
  <FormField
    id={id}
    label={label}
    error={error}
    info={info}
    required={required}
    orientation={orientation}
  >
    {multi ? (
      <SelectMulti<T>
        id={id}
        align={align}
        value={value}
        options={options}
        disabled={disabled}
        onSelect={onSelect}
      />
    ) : (
      <Select<T>
        id={id}
        align={align}
        value={value}
        options={options}
        disabled={disabled}
        onSelect={onSelect}
      />
    )}
  </FormField>
);
