export const subjectStore = {
  namespaced: true,

  state: {
    subjects: null,
    subject: null,
  },

  getters: {
    getSubjectById: (state) => (subjectId) => {
      return state.subjects
        ? state.subjects.find((subject) => subject.id === subjectId)
        : null;
    },
  },

  mutations: {
    setSubject(state, payload) {
      state.subject = payload;
    },

    setSubjects(state, payload) {
      state.subjects = payload;
    },
  },

  actions: {
    async fetchSubjectBySubjectId({ commit }, subjectId) {
      let subject = await fetch(`/api/v1/subjects/${subjectId}`);
      subject = await subject.json();
      console.log(`Subject by subjectId: ${subjectId}`, subject);
      commit("setSubject", subject);
    },

    async fetchAllSubjectsBySubforumName({ commit }, subForumName) {
      let subjects = await fetch(`/api/v1/subjects/subforum/${subForumName}`);
      subjects = await subjects.json();
      console.log(`Subjects by subforumName: ${subForumName}`, subjects);
      commit("setSubjects", subjects);
    },

    async postNewSubject(context, subject) {
      let info = await fetch("/api/v1/subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subject),
      });
      info = await info.json();
      console.log(info);
    },
  },
};
