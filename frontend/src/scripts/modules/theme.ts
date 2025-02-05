import { colors } from './colors';

export const VU = 8; // vertical unit
export const toVU = (count: number): string => `${VU * count}px`;

export const theme = {
  color: colors,
  font: {
    default: 'Tahoma, Verdana, Arial, sans-serif',
  },
  fontSize: {
    small: '12px',
    base: '14px',
    large: '18px',
    larger: '24px',
  },
  lineHeight: {
    small: toVU(3),
    base: toVU(3),
    large: toVU(3),
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
  shadow: {
    default: `1px 1px 4px ${colors.grey}`,
  },
  zIndex: {
    dropdown: 1000,
    modal: 10000,
  },
  dimensions: {
    page: {
      minWidth: toVU(40),
    },
    sidebar: {
      width: toVU(32),
    },
  },
};
