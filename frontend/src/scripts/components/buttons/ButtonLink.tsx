import { FC } from 'react';
import styled from 'styled-components';

import { ButtonText } from './ButtonText';
import { Ico } from 'components/common/Ico';
import { Link } from 'components/common/Link';
import {
  ButtonProps,
  ButtonStyles,
  ButtonStyledProps,
} from 'components/buttons/ButtonShared';

const StyledLink = styled(Link)<ButtonStyledProps>`
  ${ButtonStyles};
  text-decoration: none;
`;

interface Props extends ButtonProps {
  readonly to: string;
  readonly onClick?: () => void;
}

export const ButtonLink: FC<Props> = ({
  className,
  ico,
  icoAfter,
  icoBefore,
  icoSpin,
  text,
  title,
  to,
  onClick,
}) => {
  icoAfter = icoAfter ?? ico;
  return (
    <StyledLink
      className={className}
      $hasText={!!text}
      $hasIcoLeft={!!icoBefore}
      $hasIcoRight={!!icoAfter}
      title={title}
      to={to}
      onClick={onClick}
    >
      {!!icoBefore && <Ico ico={icoBefore} spin={icoSpin} />}
      {!!text && <ButtonText>{text}</ButtonText>}
      {!!icoAfter && <Ico ico={icoAfter} spin={icoSpin} />}
    </StyledLink>
  );
};
