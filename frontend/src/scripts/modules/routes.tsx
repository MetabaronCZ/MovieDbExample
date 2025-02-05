import { JSX } from 'react';

import { paths } from './paths';

import { HomePage } from 'components/pages/HomePage';
import { Error404Page } from 'components/pages/Error404Page';
import { MovieEditPage } from 'components/pages/MovieEditPage';
import { MovieListPage } from 'components/pages/MovieListPage';
import { PersonListPage } from 'components/pages/PersonListPage';
import { MovieDetailPage } from 'components/pages/MovieDetailPage';
import { PersonDetailPage } from 'components/pages/PersonDetailPage';

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
    id: 'movie-list',
    path: paths.MOVIE_LIST,
    component: <MovieListPage />,
  },
  {
    id: 'movie-detail',
    path: paths.MOVIE_DETAIL(':id'),
    component: <MovieDetailPage />,
  },
  {
    id: 'movie-edit',
    path: paths.MOVIE_EDIT(':id'),
    component: <MovieEditPage />,
  },
  {
    id: 'person-list',
    path: paths.PERSON_LIST,
    component: <PersonListPage />,
  },
  {
    id: 'person-detail',
    path: paths.PERSON_DETAIL(':id'),
    component: <PersonDetailPage />,
  },
  {
    id: 'error404',
    path: paths.ERROR404,
    component: <Error404Page />,
  },
];
