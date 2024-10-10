import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from './app/App';
import '@/shared/assets/themes/vars-colors.scss';
import '@/shared/assets/themes/vars-common.scss';
import '@/shared/assets/themes/styles.scss';

if (typeof window !== 'undefined') {
  const rootNode = document.getElementById('root');
  if (rootNode) {
    hydrateRoot(
      rootNode,
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } else {
    throw new Error('Root Node Not Found');
  }
}
