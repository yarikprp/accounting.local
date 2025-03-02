import { getDatabase, ref, push, set } from "firebase/database";
import { firebaseApp } from "firebase/app";

export default {
  actions: {
    async createCategory({ dispatch }, { title, limit }) {
      const uid = await dispatch("getUid");
      const db = getDatabase(firebaseApp);
      const categoryRef = ref(db, `/users/${uid}/categories`);

      const newCategoryRef = push(categoryRef);
      await set(newCategoryRef, {
        title,
        limit,
      });

      return { title, limit, id: newCategoryRef.key };
    },
  },
};
