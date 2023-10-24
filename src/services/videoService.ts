import { APIs } from "./configs/api";
import { fetchData } from "./configs/fetch";

export const videoService = {
  shareVideo(payload: { url: string; title: string; description?: string }) {
    return fetchData(APIs.VIDEO, "POST", payload);
  },
  getListVideo(params: { page?: number; limit?: number }) {
    return fetchData(`${APIs.VIDEO}?page=${params.page}`, "GET");
  },
  getInfoVideo(params: { url: string }) {
    return fetchData(`${APIs.INFO_VIDEO}?url=${params.url}`, "GET");
  },
};
