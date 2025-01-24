import { FC, PropsWithChildren } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const LinkStyles = css`
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

const StyledLink = styled.a`
  ${LinkStyles};
`;

interface Props extends PropsWithChildren {
  readonly to: string;
  readonly external?: boolean;
}

export const Link: FC<Props> = ({ to, external = false, children }) => {
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
