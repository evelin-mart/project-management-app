import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from '../../store';
import { theme } from './theme';
import { Router } from 'components/Router';
import { getUserFromLocalStorage, hydrate } from 'store/user';

export const App = () => {
  const user = getUserFromLocalStorage();
  if (user) {
    store.dispatch(hydrate(user));
  }

  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router />
        </ThemeProvider>
      </Provider>
    </>
  );
};
