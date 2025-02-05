import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { toVU } from 'modules/theme';
import { paths } from 'modules/paths';
import {
  BreadcrumbsItem,
  BreadcrumbsItemId,
  createBreadcrumbs,
} from 'modules/breadcrumbs';

import { Text } from 'components/Typography';
import { Link } from 'components/common/Link';
import { Grid } from 'components/common/Grid';
import { Ico, IcoId } from 'components/common/Ico';

interface BreadcrumbsLinkProps extends BreadcrumbsItem {
  readonly ico?: IcoId;
}

const BreadcrumbLink: FC<BreadcrumbsLinkProps> = ({ title, path, ico }) => {
  const link = <Link to={path}>{title}</Link>;
  return ico ? (
    <Grid align="center" gap={0.5}>
      <Ico ico={ico} />
      {link}
    </Grid>
  ) : (
    link
  );
};

const List = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  ${Text.Base};

  &:not(:first-child)::before {
    content: '•';
    padding: 0 ${toVU(1)};
  }
`;

interface Props {
  readonly items?: BreadcrumbsItemId[];
}

export const Breadcrumbs: FC<Props> = ({ items = [] }) => {
  const { t } = useTranslation();
  const breadcrumbs = useMemo(() => createBreadcrumbs(t, items), [t, items]);

  if (0 === breadcrumbs.length) {
    return;
  }
  return (
    <List>
      <ListItem>
        <BreadcrumbLink ico="home" title={t('page.home')} path={paths.HOME} />
      </ListItem>

      {breadcrumbs.map(({ title, path }, i) => (
        <ListItem key={i}>
          {i < items.length - 1 ? (
            <BreadcrumbLink title={title} path={path} />
          ) : (
            <strong>{title}</strong>
          )}
        </ListItem>
      ))}
    </List>
  );
};
