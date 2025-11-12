import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://studt-mate-api.vercel.app',
})

const useAxios = () => {
    return axiosInstance;
}

export default useAxios
