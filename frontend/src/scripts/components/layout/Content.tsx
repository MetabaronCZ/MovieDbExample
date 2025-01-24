import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

import { toVU } from 'modules/theme';
import { Grid } from 'components/common/Grid';

const Container = styled(Grid)`
  flex: 1;
  width: 100%;
  min-width: 0;
  padding: ${toVU(2)} ${toVU(3)};
`;

export const Content: FC<PropsWithChildren> = ({ children }) => (
  <Container component="main" orientation="vertical">
    {children}
  </Container>
);
