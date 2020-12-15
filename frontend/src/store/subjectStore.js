export const subjectStore = {
  namespaced: true,

  state: {
    subjects: null,
  },

  mutations: {
    setSubjects(state, payload) {
      state.subjects = payload;
    },
  },

  actions: {
    async fetchAllSubjects({ commit }) {
      let subjects = await fetch("/api/v1/subjects");
      subjects = await subjects.json();
      commit("setSubjects", subjects);
    },
  },
};
