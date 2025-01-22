import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { toVU } from 'modules/theme';
import { Grid } from 'components/common/Grid';

const Container = styled(Grid)`
  width: 100%;
  padding: ${toVU(2)};
  background: ${({ theme }) => theme.color.surface};
  box-shadow: ${({ theme }) => theme.shadow.default};
`;

export const Box: React.FC<PropsWithChildren> = ({ children }) => (
  <Container orientation="vertical">{children}</Container>
);
