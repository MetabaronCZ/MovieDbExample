import { FC } from 'react';
import styled, { css } from 'styled-components';

import { TextBaseSharedStyles, TextSharedProps } from './TextShared';

export const TextareaBaseStyles = css`
  ${TextBaseSharedStyles};
  resize: none;
`;

const StyledTextarea = styled.textarea<TextSharedProps>`
  ${TextareaBaseStyles};
`;

export interface TextareaBaseProps {
  readonly id?: string;
  readonly className?: string;
  readonly placeholder?: string;
  readonly value: string;
  readonly name?: string;
  readonly maxLength?: number;
  readonly invalid?: boolean;
  readonly disabled?: boolean;
  readonly autoFocus?: boolean;
  readonly onChange: (value: string) => void;
}

export const TextareaBase: FC<TextareaBaseProps> = ({
  id,
  className,
  placeholder,
  name,
  value,
  maxLength,
  invalid = false,
  disabled = false,
  autoFocus = false,
  onChange,
}) => (
  <StyledTextarea
    id={id}
    className={className}
    placeholder={placeholder}
    value={value}
    name={name}
    maxLength={maxLength}
    $invalid={invalid}
    disabled={disabled}
    autoFocus={autoFocus}
    autoComplete="one-time-code"
    onChange={(e) => {
      if (!disabled) {
        onChange(e.target.value);
      }
    }}
  />
);
