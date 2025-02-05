import { FC } from 'react';
import styled from 'styled-components';

import { toVU } from 'modules/theme';
import { ColorId } from 'modules/colors';

import { ButtonRaw } from './ButtonRaw';
import { Ico, IcoId, IcoSize } from 'components/common/Ico';

const StyledButton = styled(ButtonRaw)`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${toVU(4)};
  height: ${toVU(4)};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.color.background};
  }

  &:focus {
    outline: ${({ theme }) => theme.outline.default};
  }
`;

interface Props {
  readonly className?: string;
  readonly ico: IcoId;
  readonly icoSize?: IcoSize;
  readonly icoSpin?: boolean;
  readonly title?: string;
  readonly color?: ColorId;
  readonly disabled?: boolean;
  readonly onClick: () => void;
}

export const IcoButton: FC<Props> = ({
  className,
  ico,
  icoSize = 'large',
  icoSpin,
  title,
  color = 'base',
  disabled = false,
  onClick,
}) => (
  <StyledButton
    className={className}
    title={title}
    disabled={disabled}
    onClick={onClick}
  >
    <Ico
      ico={ico}
      size={icoSize}
      color={disabled ? 'disabled' : color}
      spin={icoSpin}
    />
  </StyledButton>
);
