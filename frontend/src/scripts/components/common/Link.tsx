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
  readonly className?: string;
  readonly title?: string;
  readonly to: string;
  readonly external?: boolean;
  readonly onClick?: () => void;
}

export const Link: FC<Props> = ({
  className,
  title,
  to,
  external = false,
  children,
  onClick,
}) => {
  const sharedProps = { className, title, onClick, children };
  return external ? (
    <StyledLink {...sharedProps} href={to} target="_blank" />
  ) : (
    <StyledLink as={RouterLink} {...sharedProps} to={to} />
  );
};
