import axios, { RawAxiosRequestHeaders as Headers } from "axios";
import * as SecureStore from "expo-secure-store";

const uploadsUrl = `${baseUrl}/uploads`;

type UploadArgs = {
  file: File;
  id: string;
  order: number;
  signal?: AbortSignal;
  onProgress?: (percent: number) => void;
};

const bearerAuth = async () => {
  let token = undefined;

  try {
    const getToken = await SecureStore.getItemAsync("token");
    token = getToken;
  } catch (error) {
    console.log(error);
  }
  return token ? `Bearer ${token}` : undefined;
};

async function withAuth(hs?: Headers): Promise<Headers> {
  const token = await bearerAuth();
  return { ...hs, Authorization: token };
}

export function formBody(file: File, name = "file") {
  const body = new FormData();
  body.append(name, file);
  return body;
}

export async function uploadFile({
  file,
  id,
  order,
  signal,
  onProgress,
}: UploadArgs) {
  const body = formBody(file);
  const result = await axios.post(`${uploadsUrl}/${id}`, body, {
    headers: await withAuth({ "Content-Type": "multipart/form-data" }),
    params: { order },
    signal,
    onUploadProgress(event) {
      if (onProgress && event.total) {
        const percent = Math.round((event.loaded * 100) / event.total);
        onProgress(percent);
      }
    },
  });
  onProgress?.(100);
  return result;
}

export async function cleanupUploads(ids: string | string[]) {
  try {
    const res = await axios.delete(uploadsUrl, {
      headers: await withAuth(),
    });
  } catch (e: unknown) {
    console.log(e);
  }
}

import { baseUrl } from ".";
import { api } from "../api/base";
import { Upload } from "../api/types/types";

export const uploadApi = api.injectEndpoints({
  endpoints: ({ query }) => ({
    listUploads: query<Upload[], string[]>({
      query: (ids: string[]) => ({
        url: "/uploads",
        method: "GET",
        params: { ids },
      }),
    }),
  }),
});

export const { useListUploadsQuery } = uploadApi;
