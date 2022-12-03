import { ROUTES } from 'constants/Routes';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store';
import { selectUser } from 'store/user';

export const ProtectedUnauthorizedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useAppSelector(selectUser);

  if (!isLoading && !data.id) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return <>{children}</>;
};
