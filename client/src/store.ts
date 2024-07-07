import { User } from "firebase/auth";
import { atom } from "jotai";

export const userAtom = atom<User | null>(null);
export const isUploadingAtom = atom<boolean>(false);

export interface Video {
  id?: string;
  uid?: string;
  fileName?: string;
  status?: "processing" | "processed";
  title?: string;
  description?: string;
}

export const videoAtom = atom<Video[]>([]);
