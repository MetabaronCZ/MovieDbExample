import { css } from 'styled-components';

import { toVU } from 'modules/theme';

import { Text } from 'components/Typography';
import { IcoId } from 'components/common/Ico';

export interface ButtonProps {
  readonly className?: string;
  readonly ico?: IcoId | null;
  readonly icoAfter?: IcoId | null;
  readonly icoBefore?: IcoId | null;
  readonly icoSpin?: boolean;
  readonly text?: string;
  readonly title?: string;
}

interface StyledProps {
  readonly $hasText?: boolean;
  readonly $hasIcoLeft?: boolean;
  readonly $hasIcoRight?: boolean;
}

export const ButtonStyles = css<StyledProps>`
  ${Text.Base};
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: ${toVU(1.5)};
  line-height: 1;
  font-weight: 700;
  height: ${toVU(4)};
  padding: 0 ${toVU(2)};
  padding-left: ${({ $hasIcoLeft, $hasText }) =>
    $hasIcoLeft || !$hasText ? toVU(1.5) : ''};
  padding-right: ${({ $hasIcoRight, $hasText }) =>
    $hasIcoRight || !$hasText ? toVU(1.5) : ''};
  border: ${({ theme }) => theme.border.default};
  background: ${({ theme }) => theme.color.surface};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.color.background};
  }

  &:focus {
    outline: ${({ theme }) => theme.outline.default};
  }

  &:disabled {
    color: ${({ theme }) => theme.color.disabled};
    border-color: ${({ theme }) => theme.color.disabled};
    background-color: ${({ theme }) => theme.color.surface};
  }
`;
