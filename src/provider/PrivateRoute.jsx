import React from 'react';
import { useAuth } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';
import useUserRole from '../hooks/useUserRole';
import Loading from '../pages/Loading';

const PrivateRoute = ({children}) => {
    const {user, loading: authLoading} = useAuth();
    const { roleLoading } = useUserRole();
      const location = useLocation();

    if(authLoading || roleLoading) {
        return <Loading></Loading>;
    }
    if (user && user?.email){
        return children;
    }
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>
};

export default PrivateRoute;