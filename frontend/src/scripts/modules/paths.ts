export const pathImages = '/images';
export const pathFonts = '/fonts';

export const paths = {
  HOME: '/',
  MOVIE_DETAIL: (id: string) => `/movie/${id}`,
  ERROR404: '*',
};

export type PathId = keyof typeof paths;
