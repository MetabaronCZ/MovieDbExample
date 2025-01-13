import { colors } from './colors';

export const VU = 8; // vertical unit
export const toVU = (count: number): string => `${VU * count}px`;

export const theme = {
  color: colors,
  font: {
    default: 'Nunito, sans-serif',
  },
  fontSize: {
    small: '14px',
    base: '16px',
    large: '20px',
    larger: '24px',
  },
  lineHeight: {
    small: toVU(3),
    base: toVU(3),
    large: toVU(4),
    larger: toVU(4),
  },
  border: {
    default: `1px solid ${colors.base}`,
    divider: `1px solid ${colors.grey}`,
    forms: `2px solid ${colors.base}`,
  },
  outline: {
    default: `1px dashed ${colors.base}`,
  },
  radius: {
    default: '8px',
  },
  shadow: {
    /* */
  },
  zIndex: {
    dropdown: 1000,
    modal: 10000,
  },
  dimensions: {
    page: {
      minWidth: toVU(40),
    },
  },
};
