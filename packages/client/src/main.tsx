import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@/shared/store/store';
import { App } from './app/App';
import '@/shared/assets/themes/colors.scss';
import '@/shared/assets/themes/styles.scss';

const rootNode = document.getElementById('root');
if (rootNode) {
  createRoot(rootNode).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  );
} else {
  throw new Error('Root Node Not Found');
}
