import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { Pages } from 'constants/Routes';
import { NotFoundPage } from 'pages/404';
import { HomePage } from 'pages/HomePage';
import { ProfilePage } from 'pages/ProfilePage';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import setupStore from 'state/store';

export const App = () => {
  const store = setupStore();
  return (
    <Provider store={store}>
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
    </Provider>
  );
};
