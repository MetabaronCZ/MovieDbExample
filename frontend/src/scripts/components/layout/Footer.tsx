import { FC } from 'react';
import { Trans } from 'react-i18next';
import styled from 'styled-components';

import { toVU } from 'modules/theme';
import { Text } from 'components/Typography';
import { Link } from 'components/common/Link';

const author = 'https://github.com/MetabaronCZ';
const authorUrl = 'https://github.com/MetabaronCZ';
const year = new Date().getFullYear();

const Container = styled.footer`
  ${Text.Small};
  padding: 0 ${toVU(2)};
  color: ${({ theme }) => theme.color.disabled};
  text-align: right;
`;

export const Footer: FC = () => (
  <Container>
    <Trans
      i18nKey="copyright"
      values={{ author, year }}
      components={[<Link to={authorUrl} external key={0} />]}
    />
  </Container>
);
