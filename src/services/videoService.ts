import { APIs } from "./configs/api";
import baseRequest from "./configs/httpService";

export const videoService = {
  shareVideo(payload: { url: string; title: string; description?: string }) {
    return baseRequest.post(APIs.VIDEO, payload);
  },
  getListVideo(params: { page?: number; limit?: number }) {
    return baseRequest.get(APIs.VIDEO, {
      params,
    });
  },
  getInfoVideo(params: { url: string }) {
    return baseRequest.get(APIs.INFO_VIDEO, {
      params,
    });
  },
};
