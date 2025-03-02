import { createStore } from "vuex";
import auth from "./auth";
import info from "./info";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      const res = await fetch(
        `https://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`
      );
      return await res.json();
    },
  },
  modules: {
    auth,
    info,
  },
});
