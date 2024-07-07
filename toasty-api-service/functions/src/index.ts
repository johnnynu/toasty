/* eslint-disable */
import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { Firestore } from "firebase-admin/firestore";
import { Storage } from "@google-cloud/storage";
import { onCall } from "firebase-functions/v2/https";

initializeApp();

const firestore = new Firestore();
const storage = new Storage();

const rawVideoBucketName = "toasty-raw-videos";

export const createUser = functions.auth.user().onCreate((user) => {
  const userInfo = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };

  firestore.collection("users").doc(userInfo.uid).set(userInfo);
  logger.info(`User created: ${userInfo.uid}`);
  return;
});

export const generateUploadUrl = onCall(
  { maxInstances: 50 },
  async (request) => {
    // Check if user is authenticated
    if (!request.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User is not authenticated"
      );
    }

    const auth = request.auth;
    const data = request.data;
    const bucket = storage.bucket(rawVideoBucketName);

    const filename = `${auth.uid}-${Date.now()}.${data.fileExtension}`;

    // Get a v4 signed URL for uploading file
    const [url] = await bucket.file(filename).getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes from now
    });

    // include the filename variable in return statement
    return { url };
  }
);

const videoCollectionId = "videos";

export interface Video {
  id?: string;
  uid?: string;
  filename?: string;
  status?: "processing" | "processed";
  title?: string;
  description?: string;
}

export const getVideos = onCall({ maxInstances: 1 }, async () => {
  const querySnapshot = await firestore
    .collection(videoCollectionId)
    .limit(10)
    .get();
  return querySnapshot.docs.map((doc) => doc.data());
});
