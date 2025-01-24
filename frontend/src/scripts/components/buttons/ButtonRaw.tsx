import { FC, PropsWithChildren, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

export type ButtonType = ButtonHTMLAttributes<HTMLButtonElement>['type'];

const StyledButton = styled.button`
  display: block;
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

interface Props extends PropsWithChildren {
  readonly id?: string;
  readonly className?: string;
  readonly type?: ButtonType;
  readonly title?: string;
  readonly disabled?: boolean;
  readonly onClick: () => void;
}

export const ButtonRaw: FC<Props> = ({
  id,
  className,
  type = 'button',
  title,
  disabled = false,
  onClick,
  children,
}) => (
  <StyledButton
    id={id}
    className={className}
    type={type}
    title={title}
    disabled={disabled}
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
  >
    {children}
  </StyledButton>
);
