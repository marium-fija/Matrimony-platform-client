import React from 'react';
import { useAuth } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';
import useUserRole from '../hooks/useUserRole';

const PrivateRoute = ({children}) => {
    const {user, loading: authLoading} = useAuth();
    const { roleLoading } = useUserRole();
      const location = useLocation();

    if(authLoading || roleLoading) {
        return <p className='text-7xl text-center'>loading</p>;
    }
    if (user && user?.email){
        return children;
    }
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>
};

export default PrivateRoute;