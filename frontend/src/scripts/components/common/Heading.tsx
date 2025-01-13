import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { Text } from 'components/Typography';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4';
type HeadingSize = 'default' | 'small' | 'large' | 'larger';

const HeadingDefault = styled.div`
  ${Text.Larger};
  font-weight: 700;
`;

const HeadingSmall = styled.div`
  ${Text.Large};
  font-weight: 700;
`;

const HeadingLarge = styled.div`
  ${Text.Large};
  font-weight: 700;
`;

const HeadingLarger = styled.div`
  ${Text.Larger};
  font-weight: 700;
`;

const getHeadingComponent = (size: HeadingSize): typeof HeadingDefault => {
  switch (size) {
    case 'small':
      return HeadingSmall;
    case 'large':
      return HeadingLarge;
    case 'larger':
      return HeadingLarger;
    default:
      return HeadingDefault;
  }
};

interface Props extends PropsWithChildren {
  readonly className?: string;
  readonly tag?: HeadingTag;
  readonly size?: HeadingSize;
}

export const Heading: React.FC<Props> = ({
  className,
  tag = 'h2',
  size = 'default',
  children,
}) => {
  const Component = getHeadingComponent(size);
  return (
    <Component className={className} as={tag}>
      {children}
    </Component>
  );
};
