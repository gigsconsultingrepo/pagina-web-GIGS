import contactModule from '@/modules/contact';
import clientsModule from '@/modules/clients';
import blogModule from '@/modules/blog';
import challengesModule from '@/modules/challenges';
import aboutModule from '@/modules/about';
import servicesModule from '@/modules/services';
import homeModule from '@/modules/home';
import { i18n, setLocale } from './i18n'


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
app.use(i18n);
setLocale(localStorage.getItem('app:locale') || 'es')
app.use(vuetify);
registerModules({  
  //Dev
  home: homeModule,
  about: aboutModule, 
  clients: clientsModule,  
  challenges: challengesModule,
  services: servicesModule,
  blog: blogModule,
  contact: contactModule,  
});

app.mount("#app");
