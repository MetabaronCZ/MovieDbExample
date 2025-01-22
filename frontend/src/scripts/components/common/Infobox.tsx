import React, { PropsWithChildren } from 'react';
import styled, { DefaultTheme } from 'styled-components';

import { toVU } from 'modules/theme';
import { Paragraph } from 'components/common/Paragraph';

type InfoboxType = 'error' | 'success' | 'info';

const getColor = (theme: DefaultTheme, type: InfoboxType): string => {
  switch (type) {
    case 'error':
      return theme.color.error;
    case 'success':
      return theme.color.success;
    default:
      return theme.color.base;
  }
};

interface StyledProps {
  readonly $type: InfoboxType;
}

const Container = styled(Paragraph)<StyledProps>`
  padding: ${toVU(1)} ${toVU(2)};
  color: ${({ theme, $type }) => getColor(theme, $type)};
  background: ${({ theme }) => theme.color.surface};
  border: ${({ theme }) => theme.border.default};
  border-color: ${({ theme, $type }) => getColor(theme, $type)};
  border-radius: ${({ theme }) => theme.radius.default};
  box-shadow: ${({ theme }) => theme.shadow.default};
`;

interface Props extends PropsWithChildren {
  readonly type?: InfoboxType;
}

export const Infobox: React.FC<Props> = ({ type = 'info', children }) => (
  <Container $type={type}>{children}</Container>
);
