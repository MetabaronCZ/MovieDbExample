import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { toVU } from 'modules/theme';
import { useOpener } from 'hooks/useOpener';

import { Grid } from 'components/common/Grid';
import { SelectResults } from './SelectResults';
import { IcoButton } from 'components/buttons/IcoButton';
import { SelectHandle, SelectHandleStyles } from './SelectHandle';
import { SelectMultiValues } from 'components/forms/select/SelectMultiValues';
import {
  SelectProps,
  SelectSearch,
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

interface Props<T> extends SelectProps<T, true> {
  readonly search?: SelectSearch<T>;
}

export const SelectMulti = <T,>({
  id,
  align,
  value,
  search,
  options,
  disabled = false,
  onSelect,
}: Props<T>): React.ReactNode => {
  const { t } = useTranslation();

  const {
    ref: containerElement,
    opened,
    open,
    close,
    toggle,
  } = useOpener<HTMLDivElement>();

  const items = options.filter((item) => !value.includes(item.value));
  const selected = options.filter((item) => value.includes(item.value));

  const selectedTitle = useMemo(() => {
    return 0 === selected.length
      ? t('select')
      : selected.map((item) => item.title).join(', ');
  }, [selected, t]);

  const selectValue = useCallback(
    (newValue: T): void => {
      if (value.includes(newValue)) {
        // remove value from selection
        const newValues = value.filter((item) => item !== newValue);
        onSelect(newValues);
      } else {
        // add value to selection
        onSelect([...value, newValue]);
      }
    },
    [value, onSelect],
  );

  const processSearch = useCallback(
    (query: string) => {
      if (search) {
        open();
        void search.onSearch(query);
      }
    },
    [open, search],
  );

  if (!search && 0 === options.length) {
    return;
  }

  if (value.length !== selected.length) {
    throw new Error(
      `Could not render Select component: Invalid value "${value.join(', ')}"!`,
    );
  }
  const closeButton = (
    <IcoButton
      ico="cross"
      title={t('cancel')}
      disabled={disabled}
      onClick={() => {
        onSelect([]);
        close();
      }}
    />
  );

  return (
    <Container ref={containerElement}>
      {search ? (
        <MultiHandle $disabled={disabled}>
          <SelectMultiValues
            items={selected}
            disabled={disabled}
            wrapped
            onRemove={selectValue}
            onSearch={processSearch}
          />
          {selected.length > 0 && <Grid gap={0}>{closeButton}</Grid>}
        </MultiHandle>
      ) : selected.length > 0 ? (
        <MultiHandle $disabled={disabled}>
          <SelectMultiValues
            items={selected}
            disabled={disabled}
            wrapped
            onRemove={selectValue}
          />

          <Grid gap={0}>
            <Grid gap={0}>{closeButton}</Grid>

            <IcoButton
              ico={opened ? 'angleUp' : 'angleDown'}
              disabled={disabled}
              onClick={toggle}
            />
          </Grid>
        </MultiHandle>
      ) : (
        <SelectHandle
          id={id}
          opened={opened}
          disabled={disabled}
          onClick={toggle}
        >
          {selectedTitle}
        </SelectHandle>
      )}

      {opened && !disabled && (
        <SelectResults
          align={align}
          loading={search?.loading}
          options={search ? search.items : items}
          onSelect={selectValue}
        />
      )}
    </Container>
  );
};
