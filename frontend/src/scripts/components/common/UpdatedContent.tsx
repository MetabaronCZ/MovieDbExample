import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  opacity: 0.65;
  pointer-events: none;
`;

interface Props extends PropsWithChildren {
  readonly loading?: boolean;
}

export const UpdatedContent: FC<Props> = ({ loading, children }) => {
  return loading ? <Container>{children}</Container> : children;
};
