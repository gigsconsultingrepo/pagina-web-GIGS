export default {
    namespaced: true,
    state: {
      pageTitle: "services",
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
