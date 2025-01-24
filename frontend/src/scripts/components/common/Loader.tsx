import { FC } from 'react';
import styled, { keyframes } from 'styled-components';

import { toVU } from 'modules/theme';
import { Grid } from 'components/common/Grid';

const spinAnimation = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled(Grid)`
  padding: ${toVU(1)} 0;
`;

const Ico = styled.i`
  display: inline-block;
  width: ${toVU(3)};
  height: ${toVU(3)};
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.color.disabled};
  border-top-color: ${({ theme }) => theme.color.base};
  border-radius: 50%;
  animation: ${spinAnimation} 1s ease-in-out infinite;
`;

export const Loader: FC = () => (
  <Container align="center" justify="center">
    <Ico />
  </Container>
);
