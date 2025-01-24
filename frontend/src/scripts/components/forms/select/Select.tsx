import { JSX, ReactNode } from 'react';
import styled from 'styled-components';

import { useOpener } from 'hooks/useOpener';

import { SelectHandle } from './SelectHandle';
import { SelectResults } from './SelectResults';

export type SelectAlign = 'left' | 'right';

export interface SelectOption<T> {
  readonly title: string;
  readonly extra?: JSX.Element;
  readonly description?: string;
  readonly value: T;
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

interface Props<T> {
  readonly id?: string;
  readonly value: T;
  readonly align?: SelectAlign;
  readonly options: SelectOption<T>[];
  readonly disabled?: boolean;
  readonly onSelect: (value: T) => void;
}

export const Select = <T,>({
  id,
  align,
  value,
  options,
  disabled = false,
  onSelect,
}: Props<T>): ReactNode => {
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
