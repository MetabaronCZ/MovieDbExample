import React from 'react';
import styled, { keyframes } from 'styled-components';

import { toVU } from 'modules/theme';

const spinAnimation = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
  opacity: 0;
  animation:
    ${spinAnimation} 1s ease-in-out infinite,
    ${fadeInAnimation} 500ms ease-in 500ms forwards;
`;

export const Loader: React.FC = () => (
  <Container>
    <Ico />
  </Container>
);
