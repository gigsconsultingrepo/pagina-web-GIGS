import router from "./router";
import store from "./store";

const registerModule = (module) => {
    store.dispatch("addModule", module);
};

export const registerModules = modules => {  
  Object.keys(modules).forEach(moduleKey => {
    registerModule( modules[moduleKey] );
  });

};
