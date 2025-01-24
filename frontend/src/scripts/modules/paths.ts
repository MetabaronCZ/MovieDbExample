export const pathImages = '/images';
export const pathFonts = '/fonts';

export const paths = {
  HOME: '/',
  MOVIE_LIST: '/movies',
  MOVIE_DETAIL: (id: string) => `/movies/${id}`,
  ERROR404: '*',
};

export type PathId = keyof typeof paths;
