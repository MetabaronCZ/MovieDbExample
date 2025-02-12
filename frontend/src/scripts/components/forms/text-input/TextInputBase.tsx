import { FC, HTMLInputTypeAttribute, RefObject } from 'react';
import styled from 'styled-components';

import { TextBaseSharedStyles, TextSharedProps } from './TextShared';

const StyledInput = styled.input<TextSharedProps>`
  ${TextBaseSharedStyles};
`;

export interface TextInputBaseProps {
  readonly ref?: RefObject<HTMLInputElement | null>;
  readonly id?: string;
  readonly className?: string;
  readonly type?: HTMLInputTypeAttribute;
  readonly placeholder?: string;
  readonly value: string;
  readonly name?: string;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly maxLength?: number;
  readonly invalid?: boolean;
  readonly disabled?: boolean;
  readonly autoFocus?: boolean;
  readonly onChange: (value: string) => void;
  readonly onFocus?: () => void;
}

export const TextInputBase: FC<TextInputBaseProps> = ({
  id,
  ref,
  className,
  type = 'text',
  placeholder,
  value,
  name,
  min,
  max,
  step,
  maxLength,
  invalid = false,
  disabled = false,
  autoFocus = false,
  onChange,
  onFocus,
}) => (
  <StyledInput
    id={id}
    ref={ref}
    className={className}
    placeholder={placeholder}
    type={type}
    value={value}
    name={name}
    $invalid={invalid}
    disabled={disabled}
    autoFocus={autoFocus}
    autoComplete="one-time-code"
    min={min}
    max={max}
    step={step}
    maxLength={maxLength}
    onFocus={onFocus}
    onChange={(e) => {
      if (!disabled) {
        onChange(e.target.value);
      }
    }}
  />
);
