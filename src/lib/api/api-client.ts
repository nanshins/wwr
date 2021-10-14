import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

type WPPublishStatus = "publish" | "future" | "draft" | "pending" | "private";

type WPRenderContent = {
  protected: boolean;
  rendered: string;
};

type WPContentBasicResponse = {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
};

type WPPost = WPContentBasicResponse & {
  author: number;
  categories: number[];
  status: WPPublishStatus;
  title: Pick<WPRenderContent, "rendered">;
  content: WPRenderContent;
  excerpt: WPRenderContent;
  slug: string;
  link: string;
  featured_media?: number;
};

type WPMediaDetails = {
  width: number;
  height: number;
  file: string;
  image_meta: object;
  sizes: {
    thumbnail: WPMediaDetails;
    medium: WPMediaDetails;
    medium_large: WPMediaDetails;
    full: WPMediaDetails;
  };
};

type WPMedia = WPContentBasicResponse & {
  slug: string;
  link: string;
  status: WPPublishStatus;
  title: Pick<WPRenderContent, "rendered">;
  description: Pick<WPRenderContent, "rendered">;
  cation: Pick<WPRenderContent, "rendered">;
  media_type: "image" | "file";
  media_details: WPMediaDetails;
  source_url: string;
  alt_text?: string;
  missing_image_sizes: [];
};

class WPClient {
  private axios: AxiosInstance;
  constructor(prefix: string, config?: AxiosRequestConfig) {
    this.axios = axios.create({
      ...config,
      baseURL: prefix
    });
  }

  async get<Query = {}, Response = {}>(
    url: string,
    params?: Query,
    config?: AxiosRequestConfig
  ) {
    const response = await this.axios.get<Response>(url, {
      ...config,
      params
    });

    return response.data;
  }

  async post<Body = {}, Response = {}>(
    url: string,
    body: Body,
    config?: AxiosRequestConfig
  ) {
    const response = await this.axios.post<Response>(url, body, config);

    return response.data;
  }
}

export { WPClient };
export type { WPPost, WPMedia };
