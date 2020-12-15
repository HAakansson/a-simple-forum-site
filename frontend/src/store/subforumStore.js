export const subforumStore = {
  namespaced: true,

  state: {
    subforums: null,
  },

  mutations: {
    setSubforums(state, payload) {
      state.subforums = payload;
    },
  },

  actions: {
    async fetchAllSubforums({ commit }) {
      let subforums = await fetch("/api/v1/subforums");
      subforums = await subforums.json();
      commit("setSubforums", subforums);
    },
  },
};
