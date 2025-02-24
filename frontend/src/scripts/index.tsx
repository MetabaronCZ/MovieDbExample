import { createRoot } from 'react-dom/client';

import { App } from 'components/App';

import { i18n } from 'localization';
import { Logger } from 'modules/logger';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Could not render app: Invalid HTML structure');
}
i18n
  .then(() => {
    const root = createRoot(container);
    root.render(<App />);
  })
  .catch(Logger.error);
