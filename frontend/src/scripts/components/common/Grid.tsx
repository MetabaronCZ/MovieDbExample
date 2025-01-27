import { FC, PropsWithChildren } from 'react';
import styled, { CSSProperties, WebTarget } from 'styled-components';

import { toVU } from 'modules/theme';

type GridOrientation = 'horizontal' | 'vertical';
type GridAlign = CSSProperties['alignItems'];
type GridJustify = CSSProperties['justifyContent'];

interface StyledProps {
  readonly $orientation: GridOrientation;
  readonly $align?: GridAlign;
  readonly $justify?: GridJustify;
  readonly $gap: number;
  readonly $wrap: boolean;
}

const Container = styled.div<StyledProps>`
  display: flex;
  flex-direction: ${({ $orientation }) =>
    'vertical' === $orientation ? 'column' : 'row'};
  flex-wrap: ${({ $wrap }) => ($wrap ? 'wrap' : '')};
  gap: ${({ $gap }) => toVU($gap)};
  align-items: ${({ $align }) => $align};
  justify-content: ${({ $justify }) => $justify};
`;

interface Props extends PropsWithChildren {
  readonly className?: string;
  readonly component?: WebTarget;
  readonly orientation?: GridOrientation;
  readonly align?: GridAlign;
  readonly justify?: GridJustify;
  readonly gap?: number;
  readonly wrap?: boolean;
  readonly style?: CSSProperties;
}

export const Grid: FC<Props> = ({
  className,
  component,
  orientation = 'horizontal',
  gap = 2,
  align,
  justify,
  wrap = false,
  style,
  children,
}) => (
  <Container
    className={className}
    as={component}
    $orientation={orientation}
    $align={align}
    $justify={justify}
    $gap={gap}
    $wrap={wrap}
    style={style}
  >
    {children}
  </Container>
);
