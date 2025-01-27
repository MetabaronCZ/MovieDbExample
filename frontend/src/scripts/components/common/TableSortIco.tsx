import { FC } from 'react';
import styled from 'styled-components';

import { SortDirection, sortDirections } from '@project/api-types';

import { toVU } from 'modules/theme';
import { Ico } from 'components/common/Ico';
import { Grid } from 'components/common/Grid';

interface StyledProps {
  readonly $direction: SortDirection;
}

const IcoContainer = styled.div<StyledProps>`
  position: relative;
  width: ${toVU(2)};
  height: ${toVU(1)};

  & > svg {
    position: absolute;
    right: 0;
    bottom: ${({ $direction }) => ('descending' === $direction ? 0 : '')};
    height: ${toVU(2)};
  }
`;

interface Props {
  readonly direction?: SortDirection | null;
}

export const TableSortIco: FC<Props> = ({ direction }) => (
  <Grid orientation="vertical" gap={0}>
    {sortDirections.map((value) => (
      <IcoContainer $direction={value} key={value}>
        <Ico
          ico={'descending' === value ? 'caretDown' : 'caretUp'}
          size="large"
          color={direction === value ? 'base' : 'disabled'}
        />
      </IcoContainer>
    ))}
  </Grid>
);
