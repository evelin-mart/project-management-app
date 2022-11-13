import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { Pages } from 'constants/Routes';
import { NotFoundPage } from 'pages/404';
import { HomePage } from 'pages/HomePage';
import { ProfilePage } from 'pages/ProfilePage';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from '../../store';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fe6b61',
    },
    secondary: {
      main: '#ffc967',
    },
    text: {
      primary: '#404040',
      secondary: 'white',
    },
  },
});

export const App = () => {
  return (
    <>
      <CssBaseline />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route
                path={Pages.HOME}
                element={
                  <>
                    <Header />
                    <Outlet />
                    <Footer />
                  </>
                }
              >
                <Route index element={<HomePage />} />
                <Route path={Pages.PROFILE} element={<ProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </>
  );
};
