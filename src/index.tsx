import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import setupStore from 'state/store';
import { App } from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const store = setupStore();
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
