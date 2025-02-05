import { css } from 'styled-components';

import { toVU } from 'modules/theme';

import { Text } from 'components/Typography';
import { PlaceholderStyles } from 'components/forms/Placeholder';

export interface TextSharedProps {
  readonly $invalid?: boolean;
  readonly $disabled?: boolean;
}

export const TextBaseSharedStyles = css<TextSharedProps>`
  ${Text.Base};
  ${PlaceholderStyles};
  display: block;
  border: none;
  background: transparent;
  outline: none;

  /* invalid state */
  color: ${({ theme, $invalid }) => ($invalid ? theme.color.error : '')};

  /* disabled state (via transient props) */
  color: ${({ theme, $disabled }) => ($disabled ? theme.color.disabled : '')};

  &:hover:not(:disabled) {
    background-color: ${({ theme, $disabled }) =>
      !$disabled ? theme.color.background : ''};
  }

  &:disabled {
    color: ${({ theme }) => theme.color.disabled};
  }
`;

export const TextSharedStyles = css<TextSharedProps>`
  width: 100%;
  padding: 0 ${toVU(1.5)};
  border: ${({ theme }) => theme.border.forms};
  background: ${({ theme }) => theme.color.surface};

  /* invalid state */
  border-color: ${({ theme, $invalid }) => ($invalid ? theme.color.error : '')};

  /* disabled state (via transient props) */
  border-color: ${({ theme, $disabled }) =>
    $disabled ? theme.color.disabled : ''};

  &:focus {
    outline: ${({ theme, $disabled }) =>
      !$disabled ? theme.outline.default : ''};
  }

  &:disabled {
    border-color: ${({ theme }) => theme.color.disabled};
  }
`;
