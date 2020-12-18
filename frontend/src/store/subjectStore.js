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
    async fetchAllSubjectsBySubforumName({ commit }, subForumName) {
      let subjects = await fetch(`/api/v1/subjects/${subForumName}`);
      subjects = await subjects.json();
      console.log(`Subjects by subforumName: ${subForumName}`, subjects);
      commit("setSubjects", subjects);
    },
  },
};
