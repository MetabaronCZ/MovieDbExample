import { FC, HTMLInputTypeAttribute } from 'react';

import { FormField } from './FormField';
import { TextInput } from './text-input/TextInput';

// track number of rendered items to generate auto ID
let instanceId = 0;

interface Props {
  readonly id?: string;
  readonly type?: HTMLInputTypeAttribute;
  readonly label: string;
  readonly placeholder?: string;
  readonly error?: string | null;
  readonly info?: string;
  readonly value: string;
  readonly name?: string;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly maxLength?: number;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly onChange: (value: string) => void;
}

export const TextField: FC<Props> = ({
  id = `text-input-${instanceId++}`,
  type,
  label,
  error,
  info,
  placeholder,
  value,
  name,
  min,
  max,
  step,
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
    <TextInput
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      min={min}
      max={max}
      step={step}
      maxLength={maxLength}
      invalid={!!error}
      disabled={disabled}
      onChange={onChange}
    />
  </FormField>
);
