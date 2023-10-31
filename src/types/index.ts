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

export interface VideoDetail {
  id: string;
  email: string;
  url: string;
  title: string;
  description?: string;
  listComment: {
    id: string;
    email: string;
    comment: string;
    createdAt: Date;
  }[];
}
