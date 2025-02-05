import { FC, StrictMode } from 'react';
import { ThemeProvider } from 'styled-components';
import { QueryClientProvider } from '@tanstack/react-query';

import { theme } from 'modules/theme';
import { queryClient } from 'modules/query';

import { Router } from './Router';
import { GlobalStyles } from './GlobalStyles';

export const App: FC = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
