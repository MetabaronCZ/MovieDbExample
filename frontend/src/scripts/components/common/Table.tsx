import { JSX, ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { CSSProperties } from 'styled-components';

import { SortDirection } from '@project/api-types';

import { toVU } from 'modules/theme';
import { getObjectEntries } from 'modules/core';

import { Text } from 'components/Typography';
import { Grid } from 'components/common/Grid';
import { Paragraph } from 'components/common/Paragraph';
import { UpdatedContent } from 'components/common/UpdatedContent';
import { TableHeaderContent } from 'components/common/TableHeaderContent';

type TableColumnAlign = CSSProperties['justifyContent'];

interface TableColumnData<T> {
  readonly title?: string;
  readonly width?: number | string;
  readonly align?: TableColumnAlign;
  readonly sort?: boolean;
  readonly render: (value: T) => ReactNode;
}
type TableColumnsData<T> = {
  readonly [column in keyof T]: TableColumnData<T[column]>;
};

const getCellStyles = <T,>(column: TableColumnData<T>): CSSProperties => ({
  flex: 'string' === typeof column.width ? 'initial' : column.width,
  width: 'string' === typeof column.width ? column.width : '',
});

const TableHead = styled(Grid)`
  padding-bottom: ${toVU(1)};
  border-bottom: ${({ theme }) => theme.border.divider};
`;

const TableRow = styled(Grid)`
  &:hover {
    background-color: ${({ theme }) => theme.color.background};
  }
`;

const TableColumn = styled(Grid)`
  ${Text.Base};
  min-width: 0;
  gap: ${toVU(1)};
`;

const TableHeader = styled(TableColumn)`
  font-weight: 700;
  line-height: ${({ theme }) => theme.lineHeight.larger};
`;

const TableInfo = styled(Paragraph)`
  font-style: italic;
  text-align: center;
`;

const TableError = styled(TableInfo)`
  color: ${({ theme }) => theme.color.error};
`;

interface Props<T> {
  readonly columns: TableColumnsData<T>;
  readonly data: T[];
  readonly isLoading?: boolean;
  readonly error?: string | null;
  readonly sort?: keyof T;
  readonly sortDirection?: SortDirection;
  readonly onSort?: (column: keyof T, direction: SortDirection) => void;
}

export const Table = <T,>({
  columns,
  data,
  isLoading,
  error,
  sort,
  sortDirection = 'ascending',
  onSort,
}: Props<T>): JSX.Element => {
  const { t } = useTranslation();
  const columnItems = useMemo(() => getObjectEntries(columns), [columns]);

  return (
    <UpdatedContent loading={isLoading}>
      <Grid orientation="vertical" gap={1}>
        <TableHead>
          {columnItems.map(([id, column]) => (
            <TableHeader
              justify={column.align}
              flex={1}
              style={getCellStyles(column)}
              key={String(id)}
            >
              <TableHeaderContent
                title={column.title}
                sortDirection={id === sort ? sortDirection : null}
                disabled={isLoading}
                onSort={
                  column.sort && onSort
                    ? () => {
                        if (id === sort) {
                          onSort(
                            id,
                            'ascending' === sortDirection
                              ? 'descending'
                              : 'ascending',
                          );
                        } else {
                          onSort(id, 'ascending');
                        }
                      }
                    : undefined
                }
              />
            </TableHeader>
          ))}
        </TableHead>

        {error ? (
          <TableError>{error}</TableError>
        ) : 0 === data.length ? (
          <TableInfo>{t('table.empty')}</TableInfo>
        ) : (
          <Grid orientation="vertical" gap={0.5}>
            {data.map((row, r) => (
              <TableRow key={r}>
                {columnItems.map(([id, column]) => (
                  <TableColumn
                    justify={column.align}
                    flex={1}
                    style={getCellStyles(column)}
                    key={String(id)}
                  >
                    {column.render(row[id])}
                  </TableColumn>
                ))}
              </TableRow>
            ))}
          </Grid>
        )}
      </Grid>
    </UpdatedContent>
  );
};
