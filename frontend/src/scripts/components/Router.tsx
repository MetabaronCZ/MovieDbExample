import { FC } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { routes } from 'modules/routes';

const router = createBrowserRouter(
  routes.map((route) => ({
    path: route.path,
    element: route.component,
  })),
);

export const Router: FC = () => <RouterProvider router={router} />;
