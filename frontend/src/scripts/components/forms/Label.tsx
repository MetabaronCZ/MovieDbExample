import { FC } from 'react';
import styled from 'styled-components';

import { toVU } from 'modules/theme';
import { Text } from 'components/Typography';

const StyledLabel = styled.label`
  ${Text.Base}
  display: flex;
  flex-direction: row;
  gap: ${toVU(0.5)};
`;

const Required = styled.span`
  color: ${({ theme }) => theme.color.error};

  &::after {
    content: '*';
  }
`;

interface Props {
  readonly label: string;
  readonly htmlFor?: string;
  readonly required?: boolean;
}

export const Label: FC<Props> = ({ label, htmlFor, required = false }) => (
  <StyledLabel htmlFor={htmlFor}>
    {required && <Required />}
    {label}
  </StyledLabel>
);
