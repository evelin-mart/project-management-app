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
import { BoardPage } from 'pages/BoardPage';
import { CommonModal } from 'components/Modal';
import { ProtectedUnauthorizedRoute } from './ProtectedUnauthorizedRoute';
import { ProtectedAuthorizedRoute } from './ProtectedAuthorizedRoute';

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
              <CommonModal />
            </>
          }
        >
          <Route index element={<HomePage />} />
          <Route
            path={ROUTES.BOARDS}
            element={
              <ProtectedUnauthorizedRoute>
                <BoardsPage />
              </ProtectedUnauthorizedRoute>
            }
          />
          <Route
            path={ROUTES.SIGN_UP}
            element={
              <ProtectedAuthorizedRoute>
                <SignUpPage />
              </ProtectedAuthorizedRoute>
            }
          />
          <Route
            path={ROUTES.SIGN_IN}
            element={
              <ProtectedAuthorizedRoute>
                <SignInPage />
              </ProtectedAuthorizedRoute>
            }
          />
          <Route
            path={ROUTES.PROFILE}
            element={
              <ProtectedUnauthorizedRoute>
                <ProfilePage />
              </ProtectedUnauthorizedRoute>
            }
          />
          <Route
            path={`${ROUTES.BOARDS}/:idBoard`}
            element={
              <ProtectedUnauthorizedRoute>
                <BoardPage />
              </ProtectedUnauthorizedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
