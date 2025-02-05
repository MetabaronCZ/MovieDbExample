import { ReactNode } from 'react';
import styled from 'styled-components';

import { toVU } from 'modules/theme';

import { Text } from 'components/Typography';
import { ButtonRaw } from 'components/buttons/ButtonRaw';
import {
  SelectAlign,
  SelectOption,
} from 'components/forms/select/SelectShared';

const resultsMinWidth = 30; // in vertical units (VU)
const resultsMaxHeight = 45; // in vertical units (VU)

interface StyledProps {
  readonly $align: SelectAlign;
}

const Container = styled.div<StyledProps>`
  position: absolute;
  top: calc(100% + ${toVU(0.5)});
  left: ${({ $align }) => ('right' === $align ? 0 : '')};
  right: ${({ $align }) => ('left' === $align ? 0 : '')};
  width: ${toVU(resultsMinWidth)};
  overflow: hidden;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  background: ${({ theme }) => theme.color.surface};
  border: ${({ theme }) => theme.border.default};
  box-shadow: ${({ theme }) => theme.shadow.default};
`;

const List = styled.ul`
  list-style-type: none;
  overflow-y: auto;
  max-height: ${toVU(resultsMaxHeight)};
`;

const ListItem = styled.li`
  border-bottom: ${({ theme }) => theme.border.divider};

  &:last-child {
    border-bottom: none;
  }
`;

const ResultButton = styled(ButtonRaw)`
  ${Text.Base};
  width: 100%;
  padding: ${toVU(0.5)} ${toVU(1)};
  background: ${({ theme }) => theme.color.surface};
  white-space: nowrap;
  text-align: left;

  &:hover {
    background-color: ${({ theme }) => theme.color.background};
  }

  &:focus {
    outline: ${({ theme }) => theme.outline.default};
    outline-offset: -1px;
  }
`;

interface Props<T> {
  readonly align?: SelectAlign;
  readonly options: SelectOption<T>[];
  readonly onSelect: (value: T) => void;
}

export const SelectResults = <T,>({
  align = 'right',
  options,
  onSelect,
}: Props<T>): ReactNode => (
  <Container $align={align}>
    <List>
      {options.map((item, i) => (
        <ListItem key={i}>
          <ResultButton
            title={item.description}
            onClick={() => {
              onSelect(item.value);
            }}
          >
            {item.title}
            {item.extra}
          </ResultButton>
        </ListItem>
      ))}
    </List>
  </Container>
);
