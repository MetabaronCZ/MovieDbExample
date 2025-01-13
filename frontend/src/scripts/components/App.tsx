import React from 'react';
import { ThemeProvider } from 'styled-components';
import { QueryClientProvider } from '@tanstack/react-query';

import { Router } from './Router';
import { GlobalStyles } from './GlobalStyles';

import { theme } from 'modules/theme';
import { queryClient } from 'modules/api';

export const App: React.FC = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
