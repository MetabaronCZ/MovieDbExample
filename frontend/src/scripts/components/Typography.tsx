import { css } from 'styled-components';

const Base = css`
  font-family: ${({ theme }) => theme.font.default};
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: ${({ theme }) => theme.lineHeight.base};
  color: ${({ theme }) => theme.color.base};
`;

const Small = css`
  ${Base};
  font-size: ${({ theme }) => theme.fontSize.small};
  line-height: ${({ theme }) => theme.lineHeight.small};
`;

const Large = css`
  ${Base};
  font-size: ${({ theme }) => theme.fontSize.large};
  line-height: ${({ theme }) => theme.lineHeight.large};
`;

const Larger = css`
  ${Base};
  font-size: ${({ theme }) => theme.fontSize.larger};
  line-height: ${({ theme }) => theme.lineHeight.larger};
`;

export const Text = {
  Small,
  Base,
  Large,
  Larger,
};
