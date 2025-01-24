import { JSX, ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { CSSProperties } from 'styled-components';

import { toVU } from 'modules/theme';
import { getObjectEntries } from 'modules/core';

import { Text } from 'components/Typography';
import { Grid } from 'components/common/Grid';
import { Paragraph } from 'components/common/Paragraph';
import { UpdatedContent } from 'components/common/UpdatedContent';

type TableColumnAlign = CSSProperties['textAlign'];

interface TableColumnData<T> {
  readonly title?: string;
  readonly width?: number | string;
  readonly align?: TableColumnAlign;
  readonly render: (value: T) => ReactNode;
}
type TableColumnsData<T> = {
  readonly [column in keyof T]: TableColumnData<T[column]>;
};

const getCellStyles = <T,>(column: TableColumnData<T>): CSSProperties => {
  return {
    flex: 'string' === typeof column.width ? 'initial' : column.width,
    width: 'string' === typeof column.width ? column.width : '',
    textAlign: column.align,
  };
};

const TableHead = styled(Grid)`
  padding-bottom: ${toVU(1)};
  border-bottom: ${({ theme }) => theme.border.divider};
`;

const TableRow = styled(Grid)`
  &:hover {
    background-color: ${({ theme }) => theme.color.background};
  }
`;

const TableColumn = styled.div`
  ${Text.Base};
  flex: 1;
  min-width: 0;
`;

const TableHeader = styled(TableColumn)`
  font-weight: 700;
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
}

export const Table = <T,>(props: Props<T>): JSX.Element => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => getObjectEntries(props.columns),
    [props.columns],
  );

  return (
    <UpdatedContent loading={props.isLoading}>
      <Grid orientation="vertical" gap={1}>
        <TableHead>
          {columns.map(([id, column]) => (
            <TableHeader style={getCellStyles(column)} key={String(id)}>
              {column.title ?? '\u00A0'}
            </TableHeader>
          ))}
        </TableHead>

        {props.error ? (
          <TableError>{props.error}</TableError>
        ) : 0 === props.data.length ? (
          <TableInfo>{t('table.empty')}</TableInfo>
        ) : (
          <Grid orientation="vertical" gap={0.5}>
            {props.data.map((row, r) => (
              <TableRow key={r}>
                {columns.map(([id, column]) => (
                  <TableColumn style={getCellStyles(column)} key={String(id)}>
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
