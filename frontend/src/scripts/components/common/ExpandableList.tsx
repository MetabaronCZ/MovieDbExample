import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { toVU } from 'modules/theme';
import { useOpener } from 'hooks/useOpener';

import { Ico } from 'components/common/Ico';
import { Grid } from 'components/common/Grid';
import { Link } from 'components/common/Link';
import { LinkButton } from 'components/common/LinkButton';
import { TextEllipsis } from 'components/common/TextEllipsis';

const Container = styled(Grid)`
  min-width: 0;
`;

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

const StyledIco = styled(Ico)`
  margin-right: ${toVU(1)};
`;

interface ExpandableItem {
  readonly title: string;
  readonly url?: string;
}

const renderExpandableItem = (item: ExpandableItem): ReactNode => {
  return item.url ? <Link to={item.url}>{item.title}</Link> : item.title;
};

interface Props {
  readonly values: ExpandableItem[];
}

export const ExpandableList: FC<Props> = ({ values }) => {
  const { t } = useTranslation();
  const { ref: containerElement, opened, toggle } = useOpener<HTMLDivElement>();

  if (0 === values.length) {
    return '-';
  }
  const firstItem = (
    <TextEllipsis title={values[0].title}>
      {renderExpandableItem(values[0])}
    </TextEllipsis>
  );

  if (1 === values.length) {
    return firstItem;
  }
  return (
    <Container ref={containerElement} gap={0.5}>
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
              <ListItem key={i}>
                <StyledIco ico="angleRight" color="base" />
                {renderExpandableItem(item)}
              </ListItem>
            ))}
          </List>
        )}
      </ExpandColumn>
    </Container>
  );
};
