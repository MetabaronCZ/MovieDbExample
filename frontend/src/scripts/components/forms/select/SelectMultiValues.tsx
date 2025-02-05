import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { toVU } from 'modules/theme';
import { Ico } from 'components/common/Ico';
import { Text } from 'components/Typography';
import { ButtonRaw } from 'components/buttons/ButtonRaw';
import { SelectOption } from 'components/forms/select/SelectShared';

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
  readonly items: SelectOption<T>[];
  readonly wrapped?: boolean;
  readonly disabled?: boolean;
  readonly onSelect?: (key: T) => void;
  readonly onRemove: (key: T) => void;
}

export const SelectMultiValues = <T,>({
  items,
  wrapped = false,
  disabled = false,
  onSelect,
  onRemove,
}: Props<T>): React.ReactNode => {
  const { t } = useTranslation();

  if (0 === items.length) {
    return;
  }
  return (
    <List $wrapped={wrapped}>
      {items.map(({ title, description, value }, i) => (
        <ListItem key={i}>
          <StyledButton
            title={description}
            disabled={disabled || !onSelect}
            onClick={() => {
              if (onSelect) {
                onSelect(value);
              }
            }}
          >
            {title}
          </StyledButton>

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
    </List>
  );
};
