import { APIs } from "./configs/api";
// import { baseRequest } from "./configs/httpService";
import { fetchData } from "./configs/fetch";

export const authService = {
  register(payload: { email: string; password: string }) {
    return fetchData(APIs.REGISTER, "POST", payload);
  },
  login(payload: { email: string; password: string }) {
    return fetchData(APIs.LOGIN, "POST", payload);
  },
  getProfile() {
    return fetchData(APIs.GET_ME, "GET");
  },
};
