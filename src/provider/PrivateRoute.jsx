import React from 'react';
import { useAuth } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
      const location = useLocation();

    if(loading) {
        return <p className='text-7xl text-center'>loading</p>;
    }
    if (user && user?.email){
        return children;
    }
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>
};

export default PrivateRoute;