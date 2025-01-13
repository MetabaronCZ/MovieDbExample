import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  // CSS reset
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  * {
    margin: 0;
    padding: 0;
  }

  // global styles
  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }
`;
