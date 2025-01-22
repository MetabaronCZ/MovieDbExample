import React, { PropsWithChildren } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled.a`
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }

  &:focus {
    outline: ${({ theme }) => theme.outline.default};
    outline-color: inherit;
  }
`;

interface Props extends PropsWithChildren {
  readonly to: string;
  readonly external?: boolean;
}

export const Link: React.FC<Props> = ({ to, external = false, children }) => {
  return external ? (
    <StyledLink href={to} target="_blank">
      {children}
    </StyledLink>
  ) : (
    <StyledLink as={RouterLink} to={to}>
      {children}
    </StyledLink>
  );
};
