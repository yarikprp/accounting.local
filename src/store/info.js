import { getDatabase, ref, get } from "firebase/database";
import { firebaseApp } from "firebase/app";
export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      const uid = await dispatch("getUid");
      const db = getDatabase(firebaseApp);
      const infoRef = ref(db, `/users/${uid}/info`);
      const snapshot = await get(infoRef);

      if (snapshot.exists()) {
        commit("setInfo", snapshot.val());
      } else {
        commit("setInfo", {});
      }
    },
  },
  getters: {
    info: (s) => s.info,
  },
};
