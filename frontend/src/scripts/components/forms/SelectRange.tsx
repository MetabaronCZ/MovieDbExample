import { FC, useMemo } from 'react';
import styled from 'styled-components';

import { Text } from 'components/Typography';
import { Grid } from 'components/common/Grid';
import { SelectField } from 'components/forms/SelectField';
import { SelectOption } from 'components/forms/select/SelectShared';

type FormatFn = (value: number) => string;

const getOptions = (
  values: number[],
  min: number,
  max: number,
  formatValue?: FormatFn,
): SelectOption<number>[] => {
  return values.map((value) => ({
    title: formatValue ? formatValue(value) : `${value}`,
    value: value,
    disabled: value < min || value > max,
  }));
};

const SelectDivider = styled.div`
  &::after {
    ${Text.Large};
    content: '-';
    font-weight: 700;
  }
`;

export interface SelectRangeProps {
  readonly label?: string;
  readonly from: number;
  readonly to: number;
  readonly values: number[];
  readonly disabled?: boolean;
  readonly formatValue?: FormatFn; // format option value
  readonly onFrom: (value: number) => void;
  readonly onTo: (value: number) => void;
}

export const SelectRange: FC<SelectRangeProps> = ({
  label,
  from,
  to,
  values,
  disabled = false,
  formatValue,
  onFrom,
  onTo,
}) => {
  const fromOptions = useMemo(() => {
    if (0 === values.length) {
      return [];
    }
    const min = values[0];
    return getOptions(values, min, to, formatValue);
  }, [values, to, formatValue]);

  const toOptions = useMemo(() => {
    if (0 === values.length) {
      return [];
    }
    const max = values[values.length - 1];
    return getOptions(values, from, max, formatValue);
  }, [values, from, formatValue]);

  if (from > to) {
    throw new Error(
      'Could not render SeelctRange: "from" value is greater than "to" value!',
    );
  }
  if (0 === values.length) {
    return;
  }
  return (
    <Grid align="center" gap={1}>
      <SelectField
        label={label}
        value={from}
        options={fromOptions}
        disabled={disabled}
        onSelect={onFrom}
      />

      <SelectDivider />

      <SelectField
        value={to}
        options={toOptions}
        disabled={disabled}
        onSelect={onTo}
      />
    </Grid>
  );
};
