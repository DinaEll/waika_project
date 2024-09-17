import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import '@/shared/assets/themes/vars-colors.scss';
import '@/shared/assets/themes/vars-common.scss';
import '@/shared/assets/themes/styles.scss';

const rootNode = document.getElementById('root');
if (rootNode) {
  createRoot(rootNode).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  throw new Error('Root Node Not Found');
}
