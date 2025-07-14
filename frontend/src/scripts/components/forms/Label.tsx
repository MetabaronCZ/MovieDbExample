import { FC } from 'react';
import styled from 'styled-components';

import { toVU } from 'modules/theme';
import { Text } from 'components/Typography';

interface StyledProps {
  readonly $comnpact: boolean;
}

const StyledLabel = styled.label<StyledProps>`
  ${({ $comnpact }) => ($comnpact ? Text.Small : Text.Base)}
  display: flex;
  flex-direction: row;
  gap: ${toVU(0.5)};
  white-space: nowrap;
`;

const Required = styled.span`
  color: ${({ theme }) => theme.color.error};

  &::after {
    content: '*';
  }
`;

interface Props {
  readonly className?: string;
  readonly label: string;
  readonly htmlFor?: string;
  readonly required?: boolean;
  readonly compact?: boolean;
}

export const Label: FC<Props> = ({
  className,
  label,
  htmlFor,
  required = false,
  compact = false,
}) => (
  <StyledLabel className={className} htmlFor={htmlFor} $comnpact={compact}>
    {required && <Required />}
    {label}
  </StyledLabel>
);
