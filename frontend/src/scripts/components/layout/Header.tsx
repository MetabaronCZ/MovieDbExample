import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { toVU } from 'modules/theme';
import { Heading } from 'components/common/Heading';

const Container = styled.header`
  padding: 0 ${toVU(2)};
`;

const Logo = styled.a`
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.disabled};

  &:focus {
    outline: ${({ theme }) => theme.outline.default};
    outline-color: inherit;
  }
`;

export const Header: FC = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Heading tag="h1" size="default">
        <Logo href="/">{t('app.name')}</Logo>
      </Heading>
    </Container>
  );
};
