import { FC, PropsWithChildren, useMemo } from 'react';
import styled from 'styled-components';

import { Text } from 'components/Typography';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4';
type HeadingSize = 'default' | 'large';

const HeadingDefault = styled.div`
  ${Text.Large};
  font-weight: 400;
`;

const HeadingLarge = styled.div`
  ${Text.Larger};
  font-weight: 400;
`;

interface Props extends PropsWithChildren {
  readonly className?: string;
  readonly tag?: HeadingTag;
  readonly size?: HeadingSize;
}

export const Heading: FC<Props> = ({
  className,
  tag = 'h2',
  size = 'default',
  children,
}) => {
  const componentProps = useMemo(
    () => ({ as: tag, className, children }),
    [tag, className, children],
  );
  switch (size) {
    case 'large':
      return <HeadingLarge {...componentProps} />;
    default:
      return <HeadingDefault {...componentProps} />;
  }
};
