export const pathImages = '/images';
export const pathFonts = '/fonts';

export const paths = {
  HOME: '/',
  MOVIE_LIST: '/movies',
  MOVIE_DETAIL: (id: string) => `/movies/${id}`,
  MOVIE_EDIT: (id: string) => `/movies/${id}/edit`,
  PERSON_LIST: '/people',
  PERSON_DETAIL: (id: string) => `/people/${id}`,
  ERROR404: '*',
};

export type PathId = keyof typeof paths;
