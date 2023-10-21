import { APIs } from "./configs/api";
import baseRequest from "./configs/httpService";

export const authService = {
  register(payload: { email: string; password: string }) {
    return baseRequest.post(APIs.REGISTER, payload);
  },
  login(payload: { email: string; password: string }) {
    return baseRequest.post(APIs.LOGIN, payload);
  },
  getProfile() {
    return baseRequest.get(APIs.GET_ME);
  },
};
