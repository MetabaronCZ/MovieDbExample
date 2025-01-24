import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { toVU } from 'modules/theme';
import { useOpener } from 'hooks/useOpener';

import { Grid } from 'components/common/Grid';
import { LinkButton } from 'components/common/LinkButton';
import { TextEllipsis } from 'components/common/TextEllipsis';

const List = styled.ul`
  list-style-type: none;
  position: absolute;
  top: 0;
  left: 0;
  width: max-content;
  max-width: ${toVU(30)};
  padding: ${toVU(1)} ${toVU(2)};
  background: ${({ theme }) => theme.color.surface};
  box-shadow: ${({ theme }) => theme.shadow.default};
  z-index: ${({ theme }) => theme.zIndex.dropdown};
`;

const ListItem = styled.li`
  /* */
`;

const ExpandColumn = styled.div`
  position: relative;
  flex: 1;
`;

const ButtonColumn = styled.div`
  white-space: nowrap;
`;

interface Props {
  readonly values: string[];
}

export const MovieListExpandable: FC<Props> = ({ values }) => {
  const { t } = useTranslation();
  const { opened, toggle } = useOpener();

  if (0 === values.length) {
    return '-';
  }
  const firstItem = <TextEllipsis title={values[0]}>{values[0]}</TextEllipsis>;

  if (1 === values.length) {
    return firstItem;
  }
  return (
    <Grid gap={0.5}>
      {firstItem}

      <ButtonColumn>
        (+
        <LinkButton onClick={toggle}>
          {t('moreItems', { count: values.length - 1 })}
        </LinkButton>
        )
      </ButtonColumn>

      <ExpandColumn>
        {opened && (
          <List>
            {values.slice(1).map((item, i) => (
              <ListItem key={i}>{item}</ListItem>
            ))}
          </List>
        )}
      </ExpandColumn>
    </Grid>
  );
};
