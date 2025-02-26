import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";
import dateFilter from "./filters/formatDate";
import vuelidate from "vuelidate/lib/validators";

const app = createApp(App);

app.config.globalProperties.$filters = {
  date: dateFilter,
};

createApp(App).use(store).use(router).use(vuelidate).mount("#app");
