import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider"; 
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  const axiosSecure = useAxios();
  const location = useLocation();

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/admin/${user.email}`)
        .then(res => {
          setIsAdmin(res.data?.admin === true);
          setAdminLoading(false);
        })
        .catch(() => setAdminLoading(false));
    } else {
      setAdminLoading(false);
    }
  }, [user, axiosSecure]);

  if (loading || adminLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;