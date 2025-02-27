import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";
import dateFilter from "./filters/formatDate";
import Toast, { POSITION } from "vue-toastification";
import Loader from "./components/app/Loader.vue";
import "vue-toastification/dist/index.css";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnvgwPbZMsqgchtotB2C-0Tiv8e98n43E",
  authDomain: "accunting-crm.firebaseapp.com",
  projectId: "accunting-crm",
  storageBucket: "accunting-crm.firebasestorage.app",
  messagingSenderId: "1024550973322",
  appId: "1:1024550973322:web:9687ae763f33bab9a86273",
  measurementId: "G-WWW2VNC406",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, () => {
  const app = createApp(App);

  app.use(store);
  app.use(router);
  app.use(Loader);
  app.use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
    draggable: true,
  });

  app.config.globalProperties.$filters = {
    date: dateFilter,
  };

  app.mount("#app");
});
