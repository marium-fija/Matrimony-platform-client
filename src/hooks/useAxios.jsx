import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://matrimony-platform-server-lilac.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;