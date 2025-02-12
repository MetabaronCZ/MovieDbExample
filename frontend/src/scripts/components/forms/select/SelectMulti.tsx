import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { toVU } from 'modules/theme';
import { useOpener } from 'hooks/useOpener';

import { Grid } from 'components/common/Grid';
import { SelectResults } from './SelectResults';
import { IcoButton } from 'components/buttons/IcoButton';
import { SelectHandle, SelectHandleStyles } from './SelectHandle';
import { SelectProps } from 'components/forms/select/SelectShared';
import { SelectMultiValues } from 'components/forms/select/SelectMultiValues';

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

export const SelectMulti = <T,>({
  id,
  align,
  value,
  options,
  disabled = false,
  onSelect,
}: SelectProps<T, true>): React.ReactNode => {
  const { t } = useTranslation();

  const {
    ref: containerElement,
    opened,
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

  if (0 === options.length) {
    return;
  }

  if (value.length !== selected.length) {
    throw new Error(
      `Could not render SelectMulti component: Invalid value "${value.join(', ')}"!`,
    );
  }
  return (
    <Container ref={containerElement}>
      {selected.length > 0 ? (
        <MultiHandle $disabled={disabled}>
          <SelectMultiValues
            items={selected}
            disabled={disabled}
            wrapped
            onRemove={selectValue}
          />

          <Grid gap={0}>
            <IcoButton
              ico="cross"
              title={t('cancel')}
              disabled={disabled}
              onClick={() => {
                onSelect([]);
                close();
              }}
            />
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
        <SelectResults align={align} options={items} onSelect={selectValue} />
      )}
    </Container>
  );
};
