import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "firebase/app";

export default {
  actions: {
    async login(_, { email, password }) {
      const auth = getAuth(firebaseApp);
      await signInWithEmailAndPassword(auth, email, password);
    },
    async logout() {
      await firebaseApp.auth().signOut();
    },
  },
};
