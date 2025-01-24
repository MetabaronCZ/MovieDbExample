import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

import { LinkStyles } from 'components/common/Link';
import { ButtonRaw } from 'components/buttons/ButtonRaw';

const StyledButton = styled(ButtonRaw)`
  ${LinkStyles};
  display: inline-block;
`;

interface Props extends PropsWithChildren {
  readonly id?: string;
  readonly className?: string;
  readonly onClick: () => void;
}

export const LinkButton: FC<Props> = ({ id, className, children, onClick }) => (
  <StyledButton id={id} className={className} onClick={onClick}>
    {children}
  </StyledButton>
);
