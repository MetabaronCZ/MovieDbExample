import { JSX, PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { waitFor } from '@testing-library/dom';
import { RenderOptions, RenderResult, render } from '@testing-library/react';

import { GlobalStyles } from 'components/GlobalStyles';

import { theme } from 'modules/theme';
import { flushPromises } from './core';

export const TestComponentWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <MemoryRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  </MemoryRouter>
);

export const waitForComponent = async (
  component: JSX.Element,
  renderOptions?: RenderOptions,
): Promise<RenderResult> => {
  return await waitFor(
    async () => {
      const root = render(component, renderOptions);
      await flushPromises();
      return root;
    },
    {
      timeout: 15000, // 15 seconds
    },
  );
};
