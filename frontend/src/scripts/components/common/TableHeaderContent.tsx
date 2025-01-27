import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { SortDirection } from '@project/api-types';

import { Text } from 'components/Typography';
import { ButtonRaw } from 'components/buttons/ButtonRaw';
import { TableSortIco } from 'components/common/TableSortIco';

const StyledButton = styled(ButtonRaw)`
  display: flex;
  align-items: center;

  &:focus {
    outline: ${({ theme }) => theme.outline.default};
  }
`;

const Title = styled.span`
  ${Text.Base};
  font-weight: 700;
`;

interface Props {
  readonly title?: string;
  readonly sortDirection?: SortDirection | null;
  readonly disabled?: boolean;
  readonly onSort?: () => void;
}

export const TableHeaderContent: FC<Props> = ({
  title,
  sortDirection,
  disabled = false,
  onSort,
}) => {
  const { t } = useTranslation();
  const titleComponent = <Title>{title ?? ' '}</Title>;

  if (!onSort) {
    return titleComponent;
  }
  return (
    <StyledButton
      title={
        'ascending' === sortDirection
          ? t('sort.action.descending')
          : t('sort.action.ascending')
      }
      disabled={disabled}
      onClick={onSort}
    >
      {titleComponent}
      <TableSortIco direction={sortDirection} />
    </StyledButton>
  );
};
