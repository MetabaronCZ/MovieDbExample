import { FC } from 'react';
import { TFunction } from 'i18next';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import { toVU } from 'modules/theme';
import { paths } from 'modules/paths';

import { Text } from 'components/Typography';
import { Grid } from 'components/common/Grid';
import { Ico, IcoId } from 'components/common/Ico';

interface MenuItem {
  readonly title: string;
  readonly url: string;
  readonly ico?: IcoId;
}

const getMenuItems = (t: TFunction): MenuItem[] => [
  { title: t('page.home'), url: paths.HOME, ico: 'home' },
  { title: t('page.movieList'), url: paths.MOVIE_LIST, ico: 'film' },
  { title: t('page.personList'), url: paths.PERSON_LIST, ico: 'user' },
];

const isActiveMenuItem = (path: string): boolean => {
  return '/' === path
    ? location.pathname === path
    : location.pathname.startsWith(path);
};

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
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${toVU(1)};
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

export const MenuMain: FC = () => {
  const { t } = useTranslation();
  const items = getMenuItems(t);
  return (
    <Grid component="nav" flex={1}>
      <List>
        {items.map(({ title, url, ico }, i) => (
          <ListItem key={i}>
            <MenuLink to={url} $active={isActiveMenuItem(url)}>
              {!!ico && <Ico ico={ico} />}
              {title}
            </MenuLink>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};
