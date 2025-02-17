import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { toVU } from 'modules/theme';
import { useOpener } from 'hooks/useOpener';

import { SelectResults } from './SelectResults';
import { SelectHandleStyles } from './SelectHandle';
import { IcoButton } from 'components/buttons/IcoButton';
import { SelectMultiValues } from 'components/forms/select/SelectMultiValues';
import {
  SelectProps,
  SelectSearchProps,
} from 'components/forms/select/SelectShared';

interface StyledProps {
  readonly $disabled?: boolean;
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const MultiHandle = styled.div<StyledProps>`
  ${SelectHandleStyles};
  height: auto;
  gap: ${toVU(1)};
  min-height: ${toVU(5)};
  padding-right: ${toVU(0.5)};
  border-color: ${({ theme, $disabled }) =>
    $disabled ? theme.color.disabled : ''};

  &:hover:not(:disabled) {
    background-color: ${({ theme, $disabled }) =>
      $disabled ? theme.color.surface : ''};
  }
`;

type Props<T> = Omit<SelectProps<T, true>, 'value'> & SelectSearchProps<T>;

export const SelectSearch = <T,>({
  id,
  align,
  value,
  options,
  loading = false,
  disabled = false,
  onSearch,
  onSelect,
}: Props<T>): React.ReactNode => {
  const { t } = useTranslation();

  const {
    ref: containerElement,
    opened,
    open,
    close,
  } = useOpener<HTMLDivElement>();

  const items = options.filter((item) => !value.includes(item));

  const selectValue = useCallback(
    (newValue: T): void => {
      if (value.some((item) => newValue === item.value)) {
        // remove value from selection
        const newValues = value
          .filter((item) => item.value !== newValue)
          .map((item) => item.value);
        onSelect(newValues);
      } else {
        // add value to selection
        onSelect([...value.map((item) => item.value), newValue]);
      }
    },
    [value, onSelect],
  );

  const processSearch = useCallback(
    (query: string) => {
      open();
      void onSearch(query);
    },
    [open, onSearch],
  );

  return (
    <Container ref={containerElement}>
      <MultiHandle $disabled={disabled}>
        <SelectMultiValues
          id={id}
          items={value}
          disabled={disabled}
          wrapped
          onRemove={selectValue}
          onSearch={processSearch}
        />

        {value.length > 0 && (
          <IcoButton
            ico="cross"
            title={t('cancel')}
            disabled={disabled}
            onClick={() => {
              onSelect([]);
              close();
            }}
          />
        )}
      </MultiHandle>

      {opened && !disabled && (
        <SelectResults
          align={align}
          options={items}
          loading={loading}
          onSelect={selectValue}
        />
      )}
    </Container>
  );
};
