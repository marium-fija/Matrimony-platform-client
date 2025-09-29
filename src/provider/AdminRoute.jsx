import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider"; 
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import Loading from "../pages/Loading";



const AdminRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const axios = useAxios();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
 
  const location = useLocation();

  useEffect(() => {
     let isMounted = true;

  if (user?.email) {
     setAdminLoading(true);
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
   setAdminLoading(true); 
  }

 return () => {
      isMounted = false;
    };

}, [user, axios]);

  if (authLoading || adminLoading) {
    return <Loading></Loading>;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default AdminRoute;