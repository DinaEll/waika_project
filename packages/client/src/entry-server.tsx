import { renderToString } from 'react-dom/server';
import { App } from '@/app/App';

export const render = () => renderToString(<App />);
