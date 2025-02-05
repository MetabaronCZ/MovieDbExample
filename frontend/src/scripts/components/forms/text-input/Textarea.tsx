import { FC } from 'react';
import styled from 'styled-components';

import { toVU } from 'modules/theme';
import { TextareaBase, TextareaBaseProps } from './TextareaBase';
import { TextSharedProps, TextSharedStyles } from './TextShared';

const verticalPadding = toVU(0.5);
const defaultHeight = 10; // in vertical units (VU)

interface StyledProps extends TextSharedProps {
  readonly $height: number;
}

const StyledTextarea = styled(TextareaBase)<StyledProps>`
  ${TextSharedStyles};
  padding-top: ${verticalPadding};
  padding-bottom: ${verticalPadding};
  height: calc(${({ $height }) => toVU($height)} + 2 * ${verticalPadding});
`;

interface Props extends TextareaBaseProps {
  readonly height?: number; // in vertical units (VU)
}

export const Textarea: FC<Props> = ({
  id,
  placeholder,
  height = defaultHeight,
  name,
  value,
  maxLength,
  invalid,
  disabled,
  autoFocus,
  onChange,
}) => (
  <StyledTextarea
    id={id}
    value={value}
    name={name}
    $height={height}
    placeholder={placeholder}
    maxLength={maxLength}
    invalid={invalid}
    $invalid={invalid}
    disabled={disabled}
    autoFocus={autoFocus}
    onChange={onChange}
  />
);
