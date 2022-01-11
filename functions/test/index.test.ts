import * as firebaseFunctionsTest from "firebase-functions-test";
import * as Functions from "../src/index";
// import * as admin from "firebase-admin";
import {assert} from "chai";


const test = firebaseFunctionsTest({
  databaseURL: "https://music-shorts-test.firebaseio.com",
  storageBucket: "music-shorts-test.appspot.com",
  projectId: "music-shorts-test",
}, "testServiceAccountKey.json");


describe("/", () => {
  after(() => {
    test.cleanup();
  });

  describe("helloWorld", () => {
    it("this functions will return \"hello world\"", async () => {
      const data = await test.wrap(Functions.helloWorld)({});
      assert.equal(data, "hello world");
    });
  });
});
