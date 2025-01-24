import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

import { toVU } from 'modules/theme';
import { invalidFieldAttributeName } from 'modules/scroll';

import { Label } from './Label';
import { Text } from 'components/Typography';

type FormFieldOrientation = 'vertical' | 'horizontal' | 'horizontal-reverse';

const Container = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: ${toVU(0.5)};
  border: none;
`;

interface StyledProps {
  readonly $orientation: FormFieldOrientation;
}

const OrientationWrapper = styled.div<StyledProps>`
  display: flex;
  flex-direction: ${({ $orientation }) =>
    'horizontal' === $orientation
      ? 'row'
      : 'horizontal-reverse' === $orientation
        ? 'row-reverse'
        : 'column'};
  gap: ${({ $orientation }) =>
    'vertical' === $orientation ? toVU(0.5) : toVU(1)};
  align-items: ${({ $orientation }) =>
    'vertical' === $orientation ? 'flex-start' : 'center'};
  justify-content: start;
`;

const Error = styled.p`
  ${Text.Small};
  color: ${({ theme }) => theme.color.error};
`;

const Info = styled.p`
  ${Text.Small};
  color: ${({ theme }) => theme.color.disabled};
`;

interface Props extends PropsWithChildren {
  readonly id?: string;
  readonly label: string;
  readonly info?: string;
  readonly error?: string | null;
  readonly required?: boolean;
  readonly orientation?: FormFieldOrientation;
}

export const FormField: FC<Props> = ({
  id,
  label,
  info,
  error,
  required = false,
  orientation = 'vertical',
  children,
}) => (
  <Container {...{ [invalidFieldAttributeName]: error ? true : undefined }}>
    <OrientationWrapper $orientation={orientation}>
      <Label label={label} htmlFor={id} required={required} />
      {children}
    </OrientationWrapper>

    {error ? <Error>{error}</Error> : info ? <Info>{info}</Info> : ''}
  </Container>
);
