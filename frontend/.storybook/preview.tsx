import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { QueryClientProvider } from '@tanstack/react-query';

import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';

import { theme } from '../src/scripts/modules/theme';
import { queryClient } from '../src/scripts/modules/query';
import { GlobalStyles } from '../src/scripts/components/GlobalStyles';

// initialize text localization
import '../src/scripts/localization';

const preview: Preview = {
  parameters: {
    expanded: true,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        { name: 'Default', value: 'transparent' },
        { name: 'Light', value: '#f2f7fa' },
      ],
      default: 'Default',
    },
  },
  decorators: [
    withThemeFromJSXProvider({
      themes: {
        light: theme,
      },
      defaultTheme: 'light',
      Provider: ThemeProvider,
      GlobalStyles,
    }),
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
};

export default preview;
