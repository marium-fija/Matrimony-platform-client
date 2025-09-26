import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/AuthProvider';


const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000', 
  });

  // Request interceptor
  axiosSecure.interceptors.request.use(
    (config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  axiosSecure.interceptors.response.use(
    (res) => res,
    async (error) => {
      const status = error.response?.status;
      if (status === 403) {
        navigate('/forbidden');
      } else if (status === 401) {
        await logOut();
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;