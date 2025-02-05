import { TFunction } from 'i18next';
import { paths } from './paths';

export interface BreadcrumbsItem {
  readonly title: string;
  readonly path: string;
}
export type BreadcrumbsItemId =
  | 'homepage'
  | 'movieList'
  | 'movieDetail'
  | 'personList'
  | 'personDetail'
  | 'movieEdit';

type BreadcumbsData = Record<BreadcrumbsItemId, BreadcrumbsItem>;

const getBreadcrumbData = (t: TFunction): BreadcumbsData => ({
  homepage: {
    title: t('page.home'),
    path: paths.HOME,
  },
  movieList: {
    title: t('page.movieList'),
    path: paths.MOVIE_LIST,
  },
  movieDetail: {
    title: t('page.movieDetail'),
    path: paths.MOVIE_LIST,
  },
  movieEdit: {
    title: t('page.movieEdit'),
    path: paths.MOVIE_LIST,
  },
  personList: {
    title: t('page.personList'),
    path: paths.PERSON_LIST,
  },
  personDetail: {
    title: t('page.personDetail'),
    path: paths.PERSON_LIST,
  },
});

export const createBreadcrumbs = (
  t: TFunction,
  path: BreadcrumbsItemId[],
): BreadcrumbsItem[] => {
  if (0 === path.length) {
    return [];
  }
  const data = getBreadcrumbData(t);
  return path.map((id) => data[id]);
};
