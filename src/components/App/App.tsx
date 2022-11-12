import React from 'react';
import { Provider } from 'react-redux';
import setupStore from 'state/store';

export const App = () => {
  const store = setupStore();
  return (
    <Provider store={store}>
      <div></div>
    </Provider>
  );
};
