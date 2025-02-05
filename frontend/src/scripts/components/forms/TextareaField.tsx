import { FC } from 'react';

import { FormField } from './FormField';
import { Textarea } from './text-input/Textarea';

// track number of rendered items to generate auto ID
let instanceId = 0;

interface Props {
  readonly id?: string;
  readonly label: string;
  readonly placeholder?: string;
  readonly error?: string | null;
  readonly info?: string;
  readonly value: string;
  readonly name?: string;
  readonly height?: number;
  readonly maxLength?: number;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly onChange: (value: string) => void;
}

export const TextareaField: FC<Props> = ({
  id = `textarea-${instanceId++}`,
  label,
  error,
  info,
  placeholder,
  value,
  name,
  height,
  maxLength,
  required,
  disabled,
  onChange,
}) => (
  <FormField
    id={id}
    label={label}
    error={error}
    info={info}
    required={required}
  >
    <Textarea
      id={id}
      placeholder={placeholder}
      value={value}
      name={name}
      height={height}
      maxLength={maxLength}
      invalid={!!error}
      disabled={disabled}
      onChange={onChange}
    />
  </FormField>
);
