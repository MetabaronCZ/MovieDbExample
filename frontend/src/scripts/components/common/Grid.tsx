import { FC, PropsWithChildren, RefObject } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { KnownTarget } from 'styled-components/dist/types';

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
  readonly ref?: RefObject<HTMLDivElement | null>;
  readonly className?: string;
  readonly component?: KnownTarget;
  readonly orientation?: GridOrientation;
  readonly align?: GridAlign;
  readonly justify?: GridJustify;
  readonly gap?: number;
  readonly wrap?: boolean;
  readonly style?: CSSProperties;
}

export const Grid: FC<Props> = ({
  ref,
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
    ref={ref}
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
