import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

export default {
  actions: {
    async login(_, { email, password }) {
      const auth = getAuth(firebaseApp);
      await signInWithEmailAndPassword(auth, email, password);
    },
    async register(_, { email, password, name }) {
      const auth = getAuth(firebaseApp);
      const db = getDatabase(firebaseApp);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      await set(ref(db, `users/${uid}/info`), {
        bill: 10000,
        name,
      });
    },

    async getUid() {
      const auth = getAuth(firebaseApp);
      const user = auth.currentUser;
      return user ? user.uid : null;
    },

    async logout() {
      await firebaseApp.auth().signOut();
    },
  },
};
