export interface DataErrorAxios {
  message?: string;
  statusCode?: number;
  error?: string;
}

export interface VideoItem {
  id: string;
  email: string;
  url: string;
  title: string;
  description?: string;
}

export interface InfoUser {
  id: string;
  email: string;
}

export interface BodyShareVideo {
  url: string;
  title: string;
  description?: string;
}
