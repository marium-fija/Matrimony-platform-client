import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../provider/AuthProvider';
import useAxios from './useAxios';


const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axios = useAxios();

  const { data: role = 'user', isLoading: roleLoading, refetch } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
       const res = await axios.get(`/users/${user.email}/role`, {
        headers: { 'Cache-Control': 'no-cache' }
      });
        console.log("Role fetched from server:", res.data.role);
      return res.data.role;
    },
  });

  return { role, roleLoading: authLoading || roleLoading, refetch };
};

export default useUserRole;