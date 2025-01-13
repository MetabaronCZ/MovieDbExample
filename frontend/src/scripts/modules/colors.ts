export const colors = {
  base: '#002d56',
  secondary: '#0f426e',
  background: '#f2f7fa',
  surface: '#fff',
  grey: '#dae0e3',
  active: '#0af',
  error: '#ef5350',
  success: '#00a851',
  disabled: '#98c3d9',
};
export type ColorId = keyof typeof colors;

// adds alpha channel to solid hex colors
export const addAlpha = (color: string, alpha: number): string => {
  if ('#' !== color[0] || 7 !== color.length) {
    throw new Error(
      `Could not add alpha channel to non-hex plain color: "${color}"!`,
    );
  }
  alpha = Math.min(Math.max(alpha, 0), 1);

  const opacity = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, '0')
    .toLowerCase();

  return color + opacity;
};
