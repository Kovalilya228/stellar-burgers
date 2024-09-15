import React, { ReactNode, FC, useEffect } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  component: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  component
}) => {
  const isLoading = useSelector((store) => store.profile.fetchProfilePending);
  const user = useSelector((store) => store.profile.data);

  const location = useLocation();
  if (isLoading) {
    //return <Navigate to='/login' state={{ background: location }} replace />;
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({
  component
}: {
  component: React.JSX.Element;
}): React.JSX.Element => <ProtectedRoute onlyUnAuth component={component} />;
