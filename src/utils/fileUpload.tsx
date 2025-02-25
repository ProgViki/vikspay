import axios from "axios";
import { Upload } from "../api/types/types";

export async function uploadFile({
  file,
  id,
  order,
  signal,
  onProgress,
}: {
  file: Upload;
  id: number;
  order: number;
  signal: AbortSignal;
  onProgress?: (percent: number) => void;
}) {
  const body = formBody(file);

  const result = await axios.post(`${uploadsUrl}/${id}`, body, {
    headers: withAuth({ "Content-Type": "multipart/form-data" }),
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
