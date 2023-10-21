import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ROUTES } from "../../routes/routes";
import { eraseCookie, getCookie } from "../../utils/cookies";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: false,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getCookie("token");
    if (token) {
      config.headers.authorization = "Bearer " + token;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res: AxiosResponse): AxiosResponse => {
    return res;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error?.response?.status === 401) {
      eraseCookie("token");
      window.location.href = `${window.location.origin}/${ROUTES.LOGIN}`;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
