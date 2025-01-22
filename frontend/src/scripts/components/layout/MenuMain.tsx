import React from 'react';
import { TFunction } from 'i18next';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { toVU } from 'modules/theme';
import { paths } from 'modules/paths';

import { Text } from 'components/Typography';
import { Grid } from 'components/common/Grid';

interface MenuItem {
  readonly title: string;
  readonly url: string;
}

const getMenuItems = (t: TFunction): MenuItem[] => [
  { title: t('page.home'), url: paths.HOME },
];

const isActiveMenuItem = (path: string): boolean => {
  return '/' === path
    ? location.pathname === path
    : location.pathname.startsWith(path);
};

const Container = styled(Grid)`
  flex: 1;
`;

const List = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ListItem = styled.li`
  /* */
`;

interface StyledProps {
  readonly $active: boolean;
}

const MenuLink = styled(RouterLink)<StyledProps>`
  ${Text.Base};
  display: block;
  padding: ${toVU(1)} ${toVU(2)};
  color: ${({ theme, $active }) =>
    $active ? theme.color.base : theme.color.background};
  background: ${({ theme, $active }) =>
    $active ? theme.color.disabled : theme.color.base};
  text-decoration: none;

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.color.grey : theme.color.secondary};
  }

  &:focus {
    outline: ${({ theme }) => theme.outline.default};
    outline-color: ${({ theme }) => theme.color.active};
    outline-offset: -1px;
  }
`;

export const MenuMain: React.FC = () => {
  const { t } = useTranslation();
  const items = getMenuItems(t);
  return (
    <Container component="nav">
      <List>
        {items.map(({ title, url }, i) => (
          <ListItem key={i}>
            <MenuLink to={url} $active={isActiveMenuItem(url)}>
              {title}
            </MenuLink>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
