import 'styled-components';
import { theme } from 'modules/theme';

type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    // all properties extended from Theme
  }
}
