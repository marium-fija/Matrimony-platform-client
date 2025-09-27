import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider"; 
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";


const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const axios = useAxios();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
 
  const location = useLocation();

  useEffect(() => {
     let isMounted = true;

  if (user?.email) {
    axios.get(`/users/admin/${user.email}`)
      .then(res => {
        if (isMounted) {
            setIsAdmin(res.data?.admin === true);
            setAdminLoading(false);
          }
      })
      .catch(() => {
          if (isMounted) setAdminLoading(false);
        });
  } else {
    setAdminLoading(false);
  }

 return () => {
      isMounted = false;
    };

}, [user, axios]);

  if (loading || adminLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default AdminRoute;