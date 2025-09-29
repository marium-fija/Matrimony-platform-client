import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://matrimony-platform-server-q3cfeufh1-mariums-projects-1a2166bf.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;