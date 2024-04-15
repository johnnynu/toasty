/* eslint-disable */
import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { Firestore } from "firebase-admin/firestore";

initializeApp();

const firestore = new Firestore();

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
