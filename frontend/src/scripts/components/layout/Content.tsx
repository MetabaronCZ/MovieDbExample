import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

import { toVU } from 'modules/theme';
import { Grid } from 'components/common/Grid';

const Container = styled(Grid)`
  width: 100%;
  min-width: 0;
  padding: ${toVU(2)} ${toVU(3)};
  overflow-y: auto;
`;

export const Content: FC<PropsWithChildren> = ({ children }) => (
  <Container component="main" orientation="vertical" flex={1}>
    {children}
  </Container>
);
