import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

import { toVU } from 'modules/theme';

import { Grid } from 'components/common/Grid';
import { Header } from 'components/layout/Header';
import { Footer } from 'components/layout/Footer';
import { Content } from 'components/layout/Content';
import { MenuMain } from 'components/layout/MenuMain';

const Container = styled(Grid)`
  width: 100%;
  min-width: ${({ theme }) => theme.dimensions.page.minWidth};
  min-height: 100vh;
  background: ${({ theme }) => theme.color.background};
`;

const Sidebar = styled(Grid)`
  width: ${({ theme }) => theme.dimensions.sidebar.width};
  padding: ${toVU(2)} 0;
  background: ${({ theme }) => theme.color.base};
`;

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <Container gap={0}>
    <Sidebar orientation="vertical">
      <Header />
      <MenuMain />
      <Footer />
    </Sidebar>

    <Content>{children}</Content>
  </Container>
);
