import { FC } from 'react';
import styled from 'styled-components';

import { toVU } from 'modules/theme';
import { TextInputBase, TextInputBaseProps } from './TextInputBase';
import {
  TextSharedProps,
  TextSharedStyles,
} from 'components/forms/text-input/TextShared';

const StyledInput = styled(TextInputBase)<TextSharedProps>`
  ${TextSharedStyles};
  line-height: 1;
  height: ${toVU(5)};
`;

interface Props extends TextInputBaseProps {
  /* */
}

export const TextInput: FC<Props> = ({
  id,
  type,
  placeholder,
  value,
  name,
  min,
  max,
  step,
  maxLength,
  invalid,
  disabled,
  autoFocus,
  onChange,
}) => (
  <StyledInput
    id={id}
    type={type}
    value={value}
    name={name}
    placeholder={placeholder}
    min={min}
    max={max}
    step={step}
    maxLength={maxLength}
    invalid={invalid}
    $invalid={invalid}
    disabled={disabled}
    autoFocus={autoFocus}
    onChange={onChange}
  />
);
