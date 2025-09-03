export default {
    namespaced: true,
    state: {
      pageTitle: "login",
    },
    mutations: {
      SET_PAGE_TITLE(state, title) {
        state.pageTitle = title;
      },
    },
    actions: {
    },
    getters: {
      pageTitle: state => state.pageTitle,
    }
  }
