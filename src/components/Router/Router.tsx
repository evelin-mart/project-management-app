import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { ROUTES } from 'constants/Routes';
import { NotFoundPage } from 'pages/404';
import { HomePage } from 'pages/HomePage';
import { ProfilePage } from 'pages/ProfilePage';
import { BoardsPage } from 'pages/BoardsPage';
import { SignInPage } from 'pages/SignIn';
import { SignUpPage } from 'pages/SignUp';
import { BoardPage } from 'pages/BoardPage/BoardPage';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.HOME}
          element={
            <>
              <Header />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route index element={<HomePage />} />
          <Route path={ROUTES.BOARDS} element={<BoardsPage />} />
          <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
          <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={`${ROUTES.BOARDS}/:idBoard`} element={<BoardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
