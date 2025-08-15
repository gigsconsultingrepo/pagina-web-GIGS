import servicesModule from '@/modules/services';
import homeModule from '@/modules/home';


import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { registerModules } from "./register-modules";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: "mdi",
    values: {
      mdi: "mdi",
    },
  },
});

const app = createApp(App);

app.use(store);
app.use(router);
app.use(vuetify);
registerModules({ 
  //Dev
  home: homeModule,
  services: servicesModule,

});

app.mount("#app");
