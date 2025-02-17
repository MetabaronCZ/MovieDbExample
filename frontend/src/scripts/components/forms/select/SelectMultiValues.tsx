import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { toVU } from 'modules/theme';
import { useSearch } from 'hooks/useSearch';

import { Ico } from 'components/common/Ico';
import { Text } from 'components/Typography';
import { ButtonRaw } from 'components/buttons/ButtonRaw';
import { SelectOption } from 'components/forms/select/SelectShared';
import { TextInputBase } from 'components/forms/text-input/TextInputBase';

interface StyledProps {
  readonly $wrapped?: boolean;
}

const List = styled.ul<StyledProps>`
  list-style-type: none;
  flex: ${({ $wrapped }) => ($wrapped ? 1 : '')};
  display: flex;
  flex-direction: row;
  flex-wrap: ${({ $wrapped }) => ($wrapped ? 'wrap' : '')};
  align-items: center;
  gap: ${toVU(0.5)};
  padding: ${toVU(0.5)} 0;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1px;
`;

const SearchListItem = styled(ListItem)`
  flex: 1;
  padding-left: ${toVU(0.5)};
`;

const StyledInput = styled(TextInputBase)`
  width: 100%;
`;

const StyledButton = styled(ButtonRaw)`
  ${Text.Small};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 ${toVU(1)};
  background: ${({ theme }) => theme.color.disabled};
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.color.active};
  }

  &:focus {
    outline: ${({ theme }) => theme.outline.default};
  }

  &:disabled {
    cursor: initial;
  }
`;

const ClearButton = styled(StyledButton)`
  width: ${toVU(3)};
  height: ${toVU(3)};
  padding: 0;
`;

interface Props<T> {
  readonly id?: string;
  readonly items: SelectOption<T>[];
  readonly wrapped?: boolean;
  readonly disabled?: boolean;
  readonly onRemove: (key: T) => void;
  readonly onSearch?: (value: string) => void;
}

export const SelectMultiValues = <T,>({
  id,
  items,
  wrapped = false,
  disabled = false,
  onRemove,
  onSearch,
}: Props<T>): React.ReactNode => {
  const { t } = useTranslation();

  const { query, search } = useSearch({
    onSearch: onSearch ?? (() => null),
  });

  if (!onSearch && 0 === items.length) {
    return;
  }
  return (
    <List $wrapped={wrapped}>
      {items.map(({ title, description, value }, i) => (
        <ListItem key={i}>
          <StyledButton title={description}>{title}</StyledButton>

          <ClearButton
            title={t('cancel')}
            disabled={disabled}
            onClick={() => {
              onRemove(value);
            }}
          >
            <Ico ico="cross" />
          </ClearButton>
        </ListItem>
      ))}

      {!!onSearch && (
        <SearchListItem>
          <StyledInput
            id={id}
            placeholder={t('search')}
            value={query}
            disabled={disabled}
            onChange={search}
          />
        </SearchListItem>
      )}
    </List>
  );
};
