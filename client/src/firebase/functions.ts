import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();

const generateUploadUrl = httpsCallable(functions, "generateUploadUrl");

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