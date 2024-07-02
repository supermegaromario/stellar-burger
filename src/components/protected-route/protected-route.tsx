import React from 'react';
import { useAppSelector } from '../../services/hooks';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthChecked } from '../../services/slices/userSlice';
import { getCookie } from '../../utils/cookie';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuth = getCookie('accessToken');
  const isAuthChecked = useAppSelector(selectIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuth) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }
  return children;
};
