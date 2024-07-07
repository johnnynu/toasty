import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";

const generateUploadUrl = httpsCallable(functions, "generateUploadUrl");
const getVideosFunction = httpsCallable(functions, "getVideos");

export async function uploadVideo(file: File) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res: any = await generateUploadUrl({
    fileExtension: file.name.split(".").pop(),
  });

  // Upload file via signed URL
  const uploadResult = await fetch(res?.data?.url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  return uploadResult;
}

export interface Video {
  id?: string;
  uid?: string;
  fileName?: string;
  status?: "processing" | "processed";
  title?: string;
  description?: string;
}

export async function getVideos() {
  const res: any = await getVideosFunction();
  return res.data as Video[];
}
