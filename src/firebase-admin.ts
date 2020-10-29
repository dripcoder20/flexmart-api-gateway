import { ForbiddenError } from "apollo-server";

var admin = require("firebase-admin");

var serviceAccount = require("../firebase-admin-credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://flexmart-ph.firebaseio.com"
});

export default admin



export async function  getUser(token) {
  const user = await admin.auth().verifyIdToken(token.toString().replace('Bearer ', '')).catch(() => {
        throw new ForbiddenError("Unathenticated")
      })
  return user;
}