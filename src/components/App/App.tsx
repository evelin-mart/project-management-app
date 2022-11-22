import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { ROUTES } from 'constants/Routes';
import { NotFoundPage } from 'pages/404';
import { HomePage } from 'pages/HomePage';
import { ProfilePage } from 'pages/ProfilePage';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from '../../store';
import { SignUpPage } from 'pages/SignUp';
import { Box } from '@mui/system';
import { BoardPage } from 'pages/BoardPage';
import { SignInPage } from 'pages/SignIn';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4f5285',
      contrastText: '#fe6b61',
    },
    secondary: {
      main: '#ffc967',
    },
    error: {
      main: '#fe6b61',
    },
    text: {
      primary: '#404040',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
        '#root': {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
        },
      },
    },
  },
});

export const App = () => {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route
                path={ROUTES.HOME}
                element={
                  <>
                    <Header />
                    <Box
                      sx={{
                        flex: '1 1 auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Outlet />
                    </Box>
                    <Footer />
                  </>
                }
              >
                <Route index element={<HomePage />} />
                <Route path={ROUTES.BOARDS} element={<BoardPage />} />
                <Route path={`${ROUTES.BOARDS}/:idBoard`} element={<BoardPage />} />
                <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
                <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
                <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </>
  );
};
