import * as functions from "firebase-functions";

export const helloWorld = functions.https.onCall((request, response) => {
  return "hello world";
});
