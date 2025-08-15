import services from '@/modules/services';
import sample from "@/modules/guias/sample";
import home from '@/modules/home';

import { createStore } from "vuex";

const API_URL = "/api";

export default createStore({
  modules: {
    services: services.store,
    home: home.store,
    sample: sample.store,
  },
  state: {
    modulesList: [],
  },
  getters: {
    modules: (state) => state.modulesList,
  },
  mutations: {
    SET_MODULES(state, modules) {
      state.modulesList = modules;
    },
  },
  actions: {
    addModule({ state, commit }, module) {
      if (!state.modulesList.find((m) => m === module)) {
        commit("SET_MODULES", [...state.modulesList, module]);
      } else {
        console.log("Module already exists");
      }
    },
  },
});
