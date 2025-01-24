import { JSX } from 'react';

import { paths } from './paths';

import { HomePage } from 'components/pages/HomePage';
import { Error404Page } from 'components/pages/Error404Page';
import { MovieDetailPage } from 'components/pages/MovieDetailPage';

interface Route {
  readonly id: string;
  readonly path: string;
  readonly component: JSX.Element;
}

export const routes: Route[] = [
  {
    id: 'home',
    path: paths.HOME,
    component: <HomePage />,
  },
  {
    id: 'movie-detail',
    path: paths.MOVIE_DETAIL(':id'),
    component: <MovieDetailPage />,
  },
  {
    id: 'error404',
    path: paths.ERROR404,
    component: <Error404Page />,
  },
];
