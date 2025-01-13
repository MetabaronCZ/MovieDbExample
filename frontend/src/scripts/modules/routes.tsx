import React from 'react';

import { paths } from './paths';

import { HomePage } from 'components/pages/HomePage';
import { Error404Page } from 'components/pages/Error404Page';

interface Route {
  readonly id: string;
  readonly path: string;
  readonly component: React.JSX.Element;
}

export const routes: Route[] = [
  {
    id: 'home',
    path: paths.HOME,
    component: <HomePage />,
  },
  {
    id: 'error404',
    path: paths.ERROR404,
    component: <Error404Page />,
  },
];
