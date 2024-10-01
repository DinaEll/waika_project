import { App } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/server';

export const render = () => ReactDOM.renderToString(<App />);
