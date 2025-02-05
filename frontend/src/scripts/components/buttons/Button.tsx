import { FC } from 'react';
import styled from 'styled-components';

import { ButtonText } from './ButtonText';
import { Ico } from 'components/common/Ico';
import { ButtonRaw, ButtonType } from './ButtonRaw';
import {
  ButtonProps,
  ButtonStyles,
  ButtonStyledProps,
} from 'components/buttons/ButtonShared';

const StyledButton = styled(ButtonRaw)<ButtonStyledProps>`
  ${ButtonStyles};
`;

interface Props extends ButtonProps {
  readonly id?: string;
  readonly type?: ButtonType;
  readonly disabled?: boolean;
  readonly onClick: () => void;
}

export const Button: FC<Props> = ({
  id,
  className,
  type,
  ico,
  icoAfter,
  icoBefore,
  icoSpin,
  text,
  title,
  disabled,
  onClick,
}) => {
  icoAfter = icoAfter ?? ico;
  return (
    <StyledButton
      id={id}
      className={className}
      $hasText={!!text}
      $hasIcoLeft={!!icoBefore}
      $hasIcoRight={!!icoAfter}
      title={title}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {!!icoBefore && <Ico ico={icoBefore} spin={icoSpin} />}
      {!!text && <ButtonText>{text}</ButtonText>}
      {!!icoAfter && <Ico ico={icoAfter} spin={icoSpin} />}
    </StyledButton>
  );
};
