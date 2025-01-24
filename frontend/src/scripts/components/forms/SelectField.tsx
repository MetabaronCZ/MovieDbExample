import { ReactNode } from 'react';

import { FormField } from 'components/forms/FormField';
import { Select, SelectAlign, SelectOption } from './select/Select';

// track number of rendered items to generate auto ID
let instanceId = 0;

interface Props<T> {
  readonly id?: string;
  readonly label: string;
  readonly align?: SelectAlign;
  readonly error?: string | null;
  readonly info?: string;
  readonly value: T;
  readonly options: SelectOption<T>[];
  readonly disabled?: boolean;
  readonly vertical?: boolean;
  readonly required?: boolean;
  readonly onSelect: (value: T) => void;
}

export const SelectField = <T,>({
  id = `select-${instanceId++}`,
  label,
  error,
  info,
  value,
  options,
  align,
  vertical = false,
  required,
  disabled,
  onSelect,
}: Props<T>): ReactNode => (
  <FormField
    id={id}
    label={label}
    error={error}
    info={info}
    required={required}
    orientation={vertical ? 'vertical' : 'horizontal'}
  >
    <Select<T>
      id={id}
      align={align}
      value={value}
      options={options}
      disabled={disabled}
      onSelect={onSelect}
    />
  </FormField>
);
