import { TFunction } from 'i18next';
import { paths } from './paths';

export interface BreadcrumbsItem {
  readonly title: string;
  readonly path: string;
}
export type BreadcrumbsItemId = 'homepage' | 'moviesList' | 'moviesDetail';
type BreadcumbsData = Record<BreadcrumbsItemId, BreadcrumbsItem>;

const getBreadcrumbData = (t: TFunction): BreadcumbsData => ({
  homepage: {
    title: t('page.home'),
    path: paths.HOME,
  },
  moviesList: {
    title: t('page.movieList'),
    path: paths.MOVIE_LIST,
  },
  moviesDetail: {
    title: t('page.movieDetail'),
    path: paths.MOVIE_LIST,
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
