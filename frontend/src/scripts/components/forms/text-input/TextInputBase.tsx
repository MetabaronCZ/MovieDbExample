import { forwardRef, HTMLInputTypeAttribute } from 'react';
import styled, { css } from 'styled-components';

import { TextBaseSharedStyles, TextSharedProps } from './TextShared';

export const TextInputBaseStyles = css`
  ${TextBaseSharedStyles};
`;

const StyledInput = styled.input<TextSharedProps>`
  ${TextInputBaseStyles};
`;

export interface TextInputBaseProps {
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

export const TextInputBase = forwardRef<HTMLInputElement, TextInputBaseProps>(
  (
    {
      id,
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
    },
    ref,
  ) => (
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
  ),
);
