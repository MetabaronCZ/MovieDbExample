import React from 'react';
import styled from 'styled-components';

import { useOpener } from 'hooks/useOpener';

import { SelectProps } from './SelectShared';
import { SelectHandle } from './SelectHandle';
import { SelectResults } from './SelectResults';

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

type Props<T> = SelectProps<T, false>;

export const Select = <T,>({
  id,
  align,
  value,
  options,
  disabled = false,
  onSelect,
}: Props<T>): React.ReactNode => {
  const {
    ref: containerElement,
    opened,
    close,
    toggle,
  } = useOpener<HTMLDivElement>();

  if (0 === options.length) {
    return;
  }
  const selected = options.find((item) => value === item.value);

  if (!selected) {
    throw new Error(
      `Could not render Select component: Invalid value "${value}"!`,
    );
  }

  return (
    <Container ref={containerElement}>
      <SelectHandle
        id={id}
        opened={opened}
        disabled={disabled}
        onClick={toggle}
      >
        {selected.title}
      </SelectHandle>

      {opened && !disabled && (
        <SelectResults
          align={align}
          options={options}
          onSelect={(selectedValue) => {
            onSelect(selectedValue);
            close();
          }}
        />
      )}
    </Container>
  );
};
